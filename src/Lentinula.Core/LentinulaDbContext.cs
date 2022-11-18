using Lentinula.Core.Aggregates.Articles;
using Lentinula.Core.Aggregates.Users;
using Lentinula.Core.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

// ReSharper disable UnusedAutoPropertyAccessor.Global

#pragma warning disable CS8618

namespace Lentinula.Core;

public sealed class LentinulaDbContext : DbContext
{
    private const string APP_USER = "Server";

    public LentinulaDbContext(DbContextOptions<LentinulaDbContext> options)
        : base(options)
    {
        ChangeTracker.StateChanged += SetPartialUpdate;
        ChangeTracker.Tracked      += SetPartialUpdate;
        ChangeTracker.StateChanged += SetAuditInfo;
        ChangeTracker.Tracked      += SetAuditInfo;
        ChangeTracker.StateChanged += SetSoftDelete;
        ChangeTracker.Tracked      += SetSoftDelete;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder
            .ApplyUtcDateTimeConverter()
            .ApplySoftDeleteGlobalQueryFilter();

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LentinulaDbContext).Assembly);
    }

    #region DbSet

    public DbSet<Article> Articles { get; set; }

    public DbSet<User> Users { get; set; }

    #endregion

    #region Events

    private static void SetPartialUpdate(object? sender, EntityEntryEventArgs e)
    {
        foreach (var propertyEntry in e.Entry.Properties.Where(pEntry => pEntry.IsModified))
        {
            if (Equals(propertyEntry.OriginalValue, propertyEntry.CurrentValue))
            {
                propertyEntry.IsModified = false;
            }
        }
        if (e.Entry.Properties.Count(pEntry => pEntry.IsModified) == 0)
        {
            e.Entry.State = EntityState.Unchanged;
        }
    }

    private static void SetAuditInfo(object? sender, EntityEntryEventArgs e)
    {
        if (e.Entry.Entity is IAuditable auditable)
        {
            switch (e.Entry.State)
            {
                case EntityState.Added:
                    auditable.CreationTime = DateTime.UtcNow;
                    auditable.CreatedBy    = APP_USER;
                    break;
                case EntityState.Modified:
                    e.Entry.Property(nameof(IAuditable.CreationTime)).IsModified = false;
                    e.Entry.Property(nameof(IAuditable.CreatedBy)).IsModified    = false;

                    auditable.ModifiedTime = DateTime.UtcNow;
                    auditable.ModifiedBy   = APP_USER;
                    break;
            }
        }
    }

    private static void SetSoftDelete(object? sender, EntityEntryEventArgs e)
    {
        if (e.Entry.Entity is ISoftDelete { IsDelete: true } softDelete &&
            e.Entry.OriginalValues.GetValue<bool>(nameof(ISoftDelete.IsDelete)) == false)
        {
            softDelete.DeletedTime = DateTime.UtcNow;
            softDelete.DeletedBy   = APP_USER;
        }
    }

    #endregion
}
