using Lentinula.WebAPI.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lentinula.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ArticleController : ControllerBase
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
    public async Task<IActionResult> Get(int id)
    {
        var article = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);
        return Ok(article);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post(Article article)
    {
        article.CreateTime = DateTime.Now;
        article.ModifyTime = article.CreateTime;
        _dbContext.Articles.Add(article);
        await _dbContext.SaveChangesAsync();
        return Ok(article);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Article article)
    {
        var articleToUpdate = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);

        if (articleToUpdate is null)
        {
            return NotFound();
        }
        articleToUpdate.Title = article.Title;
        articleToUpdate.Content = article.Content;
        articleToUpdate.ModifyTime = DateTime.Now;
        await _dbContext.SaveChangesAsync();
        return Ok(articleToUpdate);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var articleToDelete = await _dbContext.Articles.FirstOrDefaultAsync(x => x.Id == id);

        if (articleToDelete is null)
        {
            return Ok();
        }
        _dbContext.Articles.Remove(articleToDelete);
        await _dbContext.SaveChangesAsync();
        return Ok(articleToDelete);
    }
}
