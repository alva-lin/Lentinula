namespace Lentinula.Core.Aggregates.Articles.Dto;

/// <summary>
///     文章详情的数据模型（用于浏览文章页面）
/// </summary>
public class ArticleDto
{
    public long Id { get; set; }

    /// <summary>
    ///     文章标题
    /// </summary>
    public string Title { get; set; } = null!;

    /// <summary>
    ///     文章摘要
    /// </summary>
    public string Summary { get; set; } = string.Empty;

    /// <summary>
    ///     文章内容
    /// </summary>
    public string Content { get; set; } = null!;

    /// <summary>
    ///     创建时间
    /// </summary>
    public DateTime CreationTime { get; set; }

    /// <summary>
    ///     最后一次修改时间
    /// </summary>
    public DateTime? ModifiedTime { get; set; }
    
}
