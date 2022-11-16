using System.Linq.Expressions;

using Lentinula.Core.Converter;
using Lentinula.Core.Entities;

using Microsoft.EntityFrameworkCore;

namespace Lentinula.Core;

public static class DbContextExtension
{
    /// <summary>
    ///     Postgresql NpgSQL 时间保存时，需要转换为 UTC 时间
    /// </summary>
    public static ModelBuilder ApplyUtcDateTimeConverter(this ModelBuilder builder)
    {
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(typeof(DateTimeToUtcConverter));
                }
            }
        }
        return builder;
    }

    /// <summary>
    ///     实现了 ISoftDelete 的接口，默认筛选掉标记为删除的行
    /// </summary>
    public static ModelBuilder ApplySoftDeleteGlobalQueryFilter(this ModelBuilder builder)
    {
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDelete).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "p");
                var deletedCheck = Expression.Lambda(Expression.Equal(Expression.Property(parameter, nameof(ISoftDelete.IsDelete)), Expression.Constant(false)), parameter);
                builder.Entity(entityType.ClrType).HasQueryFilter(deletedCheck);
            }
        }
        return builder;
    }

    public static void SetPartialUpdate(this DbContext dbContext)
    {
        var modifiedEntries = dbContext.ChangeTracker.Entries()
            .Where(entry => entry.State == EntityState.Modified)
            .ToList();

        foreach (var modifiedEntry in modifiedEntries)
        {
            foreach (var propertyEntry in modifiedEntry.Properties.Where(pEntry => pEntry.IsModified))
            {
                if (Equals(propertyEntry.OriginalValue, propertyEntry.CurrentValue))
                {
                    propertyEntry.IsModified = false;
                }
            }
            if (modifiedEntry.Properties.Count(pEntry => pEntry.IsModified) == 0)
            {
                modifiedEntry.State = EntityState.Unchanged;
            }
        }
    }

    public static void SetSoftDelete(this DbContext dbContext, string deletedBy)
    {
        var now = DateTime.Now;
        var deletedEntries = dbContext.ChangeTracker.Entries()
            .Where(entry => entry.State == EntityState.Modified)
            .ToList();

        foreach (var deletedEntry in deletedEntries)
        {
            if (deletedEntry.Entity is ISoftDelete { IsDelete: true } softDelete &&
                deletedEntry.OriginalValues.GetValue<bool>(nameof(ISoftDelete.IsDelete)) == false)
            {
                softDelete.DeletedBy   = deletedBy;
                softDelete.DeletedTime = now;
            }
        }
    }

    public static void SetAuditInfo(this DbContext dbContext, string createdBy)
    {
        var now = DateTime.Now;
        var addedEntities = dbContext.ChangeTracker.Entries()
            .Where(entry => entry.State == EntityState.Added)
            .ToList();

        foreach (var addedEntity in addedEntities)
        {
            if (addedEntity.Entity is IAuditable auditable)
            {
                auditable.CreatedBy    = createdBy;
                auditable.CreationTime = now;
            }
        }

        var modifiedEntries = dbContext.ChangeTracker.Entries()
            .Where(entry => entry.State == EntityState.Modified)
            .ToList();

        foreach (var modifiedEntry in modifiedEntries)
        {
            if (modifiedEntry.Entity is IAuditable auditable)
            {
                var entry = dbContext.Entry(auditable);
                entry.Property(e => e.CreatedBy).IsModified    = false;
                entry.Property(e => e.CreationTime).IsModified = false;

                auditable.ModifiedBy   = createdBy;
                auditable.ModifiedTime = now;
            }
        }
    }
}
