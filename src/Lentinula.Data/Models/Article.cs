using System.ComponentModel.DataAnnotations;

using Lentinula.Data.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lentinula.Data.Models;

/// <summary>
/// 文章
/// </summary>
public class Article : SoftDeleteEntity<long>
{
    /// <summary>
    /// 标题
    /// </summary>
    [Required]
    [MinLength(10)]
    [MaxLength(120)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 内容
    /// </summary>
    public string Content { get; set; } = string.Empty;
}

public sealed class ArticleEntityConfiguration : IEntityTypeConfiguration<Article>
{
    public void Configure(EntityTypeBuilder<Article> builder)
    {
    }
}
