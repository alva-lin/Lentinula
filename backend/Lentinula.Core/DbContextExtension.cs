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
}
