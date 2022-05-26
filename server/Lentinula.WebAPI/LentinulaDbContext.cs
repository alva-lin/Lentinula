﻿using Lentinula.WebAPI.Models;

using Microsoft.EntityFrameworkCore;
#pragma warning disable CS8618

namespace Lentinula.WebAPI;

public class LentinulaDbContext : DbContext
{
    public LentinulaDbContext(DbContextOptions<LentinulaDbContext> options) : base(options)
    {
    }
    
    #region DbSet

    public virtual DbSet<Article> Articles { get; set; }

    #endregion


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Article>().HasKey(article => article.Id);
    }
}
