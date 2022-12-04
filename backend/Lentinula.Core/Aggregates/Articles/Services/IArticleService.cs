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
    Task<List<ArticleInfoDto>> GetList(uint pageIndex, uint pageSize, CancellationToken cancellationToken);
    
    /// <summary>
    ///     获取回收站中的文章列表
    /// </summary>
    /// <param name="pageIndex"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<List<ArticleRecycleBinDto>> GetListInRecycleBin(uint pageIndex, uint pageSize, CancellationToken cancellationToken);

    /// <summary>
    ///     获取文章详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<ArticleDto?> Get(long id);

    /// <summary>
    ///     新增文章
    /// </summary>
    /// <param name="addDto">新增的文章数据</param>
    /// <returns></returns>
    Task Add(ArticleAddDto addDto);

    /// <summary>
    ///     更新文章
    /// </summary>
    /// <param name="updateDto">更新的文章数据</param>
    /// <returns></returns>
    Task Update(ArticleUpdateDto updateDto);

    /// <summary>
    ///     将文章移动到回收站（软删除）
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    Task MoveToRecycleBin(long[] ids);

    /// <summary>
    ///     将文章移除回收站（软删除恢复）
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    Task RestoreFromRecycleBin(long[] ids);
    
    /// <summary>
    ///     删除文章
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    Task Delete(long[] ids);
}
