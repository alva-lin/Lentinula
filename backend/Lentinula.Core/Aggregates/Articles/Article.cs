using System.ComponentModel.DataAnnotations;

using Lentinula.Core.Entities;

namespace Lentinula.Core.Aggregates.Articles;

/// <summary>
///     文章
/// </summary>
public class Article : SoftDeleteEntity<long>
{
    /// <summary>
    ///     标题
    /// </summary>
    [Required]
    [MaxLength(120)]
    public string Title { get; set; } = null!;

    /// <summary>
    ///     摘要
    /// </summary>
    [MaxLength(200)]
    public string Summary { get; set; } = string.Empty;

    /// <summary>
    ///     内容
    /// </summary>
    public string Content { get; set; } = string.Empty;
}
