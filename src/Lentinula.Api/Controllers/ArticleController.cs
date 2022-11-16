using Lentinula.Api.Common;
using Lentinula.Core;
using Lentinula.Core.Aggregates.Articles;
using Lentinula.Core.Aggregates.Articles.Dto;
using Lentinula.Core.Aggregates.Articles.Services;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lentinula.Api.Controllers;

/// <summary>
///     文章控制器
/// </summary>
// [Authorize]
public class ArticleController : BasicController
{
    private readonly IArticleService _articleService;
    private readonly LentinulaDbContext _dbContext;

    public ArticleController(LentinulaDbContext dbContext, IArticleService articleService)
    {
        _dbContext      = dbContext;
        _articleService = articleService;
    }

    /// <summary>
    ///     获取文章列表
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet]
    public async Task<ResponseResult<List<ArticleInfoDto>>> Get(CancellationToken cancellationToken)
    {
        return await _articleService.GetArticles(1, 10, cancellationToken);
    }

    /// <summary>
    ///     获取文章详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ResponseResult<Article>> Get(int id)
    {
        var article = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
        return article;
    }

    /// <summary>
    ///     新增文章
    /// </summary>
    /// <param name="article"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ResponseResult<VoidObject>> Post(ArticleAddDto article)
    {
        await _articleService.AddArticle(article);
        return VoidObject.Instance;
    }

    [HttpPut("{id}")]
    public async Task<ResponseResult<VoidObject>> Put(int id, Article article)
    {
        var articleToUpdate = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);

        if (articleToUpdate is null)
        {
            throw new BasicException(ResponseCode.Fail, "找不到指定的文章");
        }
        articleToUpdate.Title   = article.Title;
        articleToUpdate.Content = article.Content;
        await _dbContext.SaveChangesAsync();
        return VoidObject.Instance;
    }

    [HttpDelete("{id}")]
    public async Task<ResponseResult<VoidObject>> Delete(int id)
    {
        var articleToDelete = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);

        if (articleToDelete != null)
        {
            _dbContext.Articles.Remove(articleToDelete);
            await _dbContext.SaveChangesAsync();
        }
        return VoidObject.Instance;
    }
}
