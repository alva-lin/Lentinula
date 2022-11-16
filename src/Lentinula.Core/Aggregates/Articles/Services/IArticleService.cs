using Lentinula.Core.Aggregates.Articles.Dto;
using Lentinula.Core.Common;

namespace Lentinula.Core.Aggregates.Articles.Services;

public interface IArticleService : IBasicService
{
    /// <summary>
    ///     获取文章列表
    /// </summary>
    /// <param name="pageIndex">页码</param>
    /// <param name="pageSize">每页的文章数量</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<List<ArticleInfoDto>> GetArticles(int pageIndex, int pageSize, CancellationToken cancellationToken);

    /// <summary>
    ///     新增文章
    /// </summary>
    /// <param name="addDto">新增的文章数据</param>
    /// <returns></returns>
    Task AddArticle(ArticleAddDto addDto);
}
