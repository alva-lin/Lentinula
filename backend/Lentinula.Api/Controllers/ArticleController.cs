using Lentinula.Api.Common;
using Lentinula.Core.Aggregates.Articles.Dto;
using Lentinula.Core.Aggregates.Articles.Services;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lentinula.Api.Controllers;

/// <summary>
///     文章控制器
/// </summary>
// [Authorize]
public class ArticleController : BasicController
{
    private readonly IArticleService _articleService;

    public ArticleController(IArticleService articleService)
    {
        _articleService = articleService;
    }

    /// <summary>
    ///     获取文章列表
    /// </summary>
    /// <param name="pageNumber"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet]
    public async Task<ResponseResult<PaginatedList<ArticleInfoDto>>> Get(uint pageNumber = 1, uint pageSize = 10, CancellationToken cancellationToken = default)
    {
        return await _articleService.GetList(pageNumber, pageSize, cancellationToken);
    }

    /// <summary>
    ///     获取回收站中的文章列表
    /// </summary>
    /// <param name="pageNumber"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("[action]")]
    public async Task<ResponseResult<PaginatedList<ArticleRecycleBinDto>>> GetListInRecycleBin(uint pageNumber = 1, uint pageSize = 10, CancellationToken cancellationToken = default)
    {
        return await _articleService.GetListInRecycleBin(pageNumber, pageSize, cancellationToken);
    }

    /// <summary>
    ///     获取文章详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ResponseResult<ArticleDto>> Get(long id)
    {
        var article = await _articleService.Get(id);
        if (article == null)
        {
            return ResponseResult.Fail<ArticleDto>(null, ResponseCode.EntityNotFound);
        }
        return article;
    }

    /// <summary>
    ///     新增文章
    /// </summary>
    /// <param name="article"></param>
    /// <returns></returns>
    [HttpPost("[action]")]
    public async Task<ResponseResult<VoidObject>> Add(ArticleAddDto article)
    {
        await _articleService.Add(article);
        return VoidObject.Instance;
    }

    /// <summary>
    ///     更新文章
    /// </summary>
    /// <param name="article"></param>
    /// <returns></returns>
    [HttpPost("[action]")]
    public async Task<ResponseResult<VoidObject>> Update(ArticleUpdateDto article)
    {
        await _articleService.Update(article);
        return VoidObject.Instance;
    }

    /// <summary>
    ///     将文章移动到回收站
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [HttpPost("[action]")]
    public async Task<ResponseResult<VoidObject>> MoveToRecycleBin(long[] ids)
    {
        await _articleService.MoveToRecycleBin(ids);
        return VoidObject.Instance;
    }

    /// <summary>
    ///     将文章从回收站恢复
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [HttpPost("[action]")]
    public async Task<ResponseResult<VoidObject>> RestoreFromRecycleBin(long[] ids)
    {
        await _articleService.RestoreFromRecycleBin(ids);
        return VoidObject.Instance;
    }

    /// <summary>
    ///     删除文章
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [HttpDelete()]
    public async Task<ResponseResult<VoidObject>> Delete(long[] ids)
    {
        await _articleService.Delete(ids);
        return VoidObject.Instance;
    }
}
