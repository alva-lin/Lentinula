using Lentinula.Core.Aggregates.Articles;
using Lentinula.Core.Aggregates.Users;

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

// ReSharper disable UnusedAutoPropertyAccessor.Global

#pragma warning disable CS8618

namespace Lentinula.Core;

public sealed class LentinulaDbContext : DbContext
{
    private const string APP_USER = "Server";
    private readonly string _userName;

    public LentinulaDbContext(DbContextOptions<LentinulaDbContext> options, IHttpContextAccessor httpContextAccessor)
        : base(options)
    {
        var claimsPrincipal = httpContextAccessor.HttpContext?.User;
        _userName = claimsPrincipal?.Claims.SingleOrDefault(c => c.Type == "username")?.Value ?? APP_USER;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder
            .ApplyUtcDateTimeConverter()
            .ApplySoftDeleteGlobalQueryFilter();

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LentinulaDbContext).Assembly);
    }

    public override int SaveChanges()
    {
        BeforeSaveChanges();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        BeforeSaveChanges();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void BeforeSaveChanges()
    {
        this.SetPartialUpdate();
        this.SetAuditInfo(_userName);
        this.SetSoftDelete(_userName);
    }

    #region DbSet

    public DbSet<Article> Articles { get; set; }

    public DbSet<User> Users { get; set; }

    #endregion
}
