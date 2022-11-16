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

    public async Task<List<ArticleInfoDto>> GetArticles(int pageIndex, int pageSize, CancellationToken cancellationToken = default)
    {
        var skip = (pageIndex - 1) * pageSize;
        var articles = await _dbContext.Articles.Skip(skip).Take(pageSize).ToListAsync(cancellationToken);
        return _mapper.Map<List<ArticleInfoDto>>(articles);
    }

    public async Task AddArticle(ArticleAddDto addDto)
    {
        var article = _mapper.Map<Article>(addDto);
        await _dbContext.Articles.AddAsync(article);
        await _dbContext.SaveChangesAsync();
    }
}
