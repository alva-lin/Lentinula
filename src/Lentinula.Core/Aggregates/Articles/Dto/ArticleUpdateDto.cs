using System.ComponentModel.DataAnnotations;

namespace Lentinula.Core.Aggregates.Articles.Dto;

/// <summary>
/// 更新文章时的数据模型
/// </summary>
public class ArticleUpdateDto
{
    public long Id { get; set; }

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
