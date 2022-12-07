namespace Lentinula.Core.Aggregates.Articles.Dto;

/// <summary>
///     回收站的文章列表数据模型
/// </summary>
public class ArticleRecycleBinDto
{
    public long Id { get; set; }

    /// <summary>
    /// 标题
    /// </summary>
    public string Title { get; set; } = null!;

    /// <summary>
    /// 创建时间
    /// </summary>
    public DateTime CreationTime { get; set; }

    /// <summary>
    /// 删除时间
    /// </summary>
    public DateTime DeletedTime { get; set; }
}
