namespace Lentinula.Core.Aggregates.Articles.Dto;

/// <summary>
///     文章信息，用于列表展示
/// </summary>
public class ArticleInfoDto
{
    /// <summary>
    ///     Id
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    ///     标题
    /// </summary>
    public string Title { get; set; } = null!;

    /// <summary>
    ///     摘要
    /// </summary>
    public string Summary { get; set; } = null!;

    /// <summary>
    ///     创建时间
    /// </summary>
    public DateTime CreationTime { get; set; }

    /// <summary>
    ///     修改时间
    /// </summary>
    public DateTime? ModifiedTime { get; set; } = null;
}
