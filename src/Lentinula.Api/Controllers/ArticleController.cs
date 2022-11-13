using Lentinula.Api.Common;
using Lentinula.Data;
using Lentinula.Data.Models;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lentinula.Api.Controllers;

[Authorize]
public class ArticleController : BasicController
{
    private readonly LentinulaDbContext _dbContext;

    public ArticleController(LentinulaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var articles = await _dbContext.Articles.ToListAsync();
        return Ok(articles);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ResponseResult<Article>> Get(int id)
    {
        var article = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
        return article;
    }

    [HttpPost]
    public async Task<ResponseResult<VoidObject>> Post(Article article)
    {
        _dbContext.Articles.Add(article);
        await _dbContext.SaveChangesAsync();
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
