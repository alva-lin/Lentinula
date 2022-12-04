using AutoMapper;

using Lentinula.Core.Aggregates.Articles.Dto;

using Microsoft.EntityFrameworkCore;

namespace Lentinula.Core.Aggregates.Articles.Services;

public class ArticleService : IArticleService
{
    private readonly LentinulaDbContext _dbContext;

    private readonly IMapper _mapper;

    public ArticleService(LentinulaDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper    = mapper;
    }

    public async Task<List<ArticleInfoDto>> GetList(uint pageIndex, uint pageSize, CancellationToken cancellationToken = default)
    {
        var skip = (pageIndex - 1) * pageSize;
        var articles = await _dbContext.Articles.OrderByDescending(article => article.CreationTime).Skip((int)skip).Take((int)pageSize).ToListAsync(cancellationToken);
        return _mapper.Map<List<ArticleInfoDto>>(articles);
    }

    public async Task<List<ArticleRecycleBinDto>> GetListInRecycleBin(uint pageIndex, uint pageSize, CancellationToken cancellationToken)
    {
        var skip = (pageIndex - 1) * pageSize;
        var articles = await _dbContext.Articles.IgnoreQueryFilters()
            .Where(article => article.IsDelete == true)
            .Skip((int)skip)
            .Take((int)pageSize)
            .ToListAsync(cancellationToken);
        return _mapper.Map<List<ArticleRecycleBinDto>>(articles);
    }

    public async Task<ArticleDto?> Get(long id)
    {
        var article = await _dbContext.Articles.FindAsync(id);
        return _mapper.Map<ArticleDto>(article);
    }

    public async Task Add(ArticleAddDto addDto)
    {
        var article = _mapper.Map<Article>(addDto);
        await _dbContext.Articles.AddAsync(article);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(ArticleUpdateDto updateDto)
    {
        var origin = await _dbContext.Articles.FindAsync(updateDto.Id);
        if (origin != null)
        {
            var article = _mapper.Map(updateDto, origin);
            _dbContext.Articles.Update(article);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task MoveToRecycleBin(long[] ids)
    {
        var articles = await _dbContext.Articles.Where(article => ids.Contains(article.Id)).ToListAsync();
        foreach (var article in articles)
        {
            article.IsDelete = true;
        }
        _dbContext.Articles.UpdateRange(articles);
        await _dbContext.SaveChangesAsync();
    }

    public async Task RestoreFromRecycleBin(long[] ids)
    {
        var articles = await _dbContext.Articles.IgnoreQueryFilters().Where(article => ids.Contains(article.Id)).ToListAsync();
        foreach (var article in articles)
        {
            article.IsDelete = false;
        }
        _dbContext.Articles.UpdateRange(articles);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(long[] ids)
    {
        var articles = await _dbContext.Articles.IgnoreQueryFilters().Where(article => ids.Contains(article.Id)).ToListAsync();
        _dbContext.Articles.RemoveRange(articles);
        await _dbContext.SaveChangesAsync();
    }
}
