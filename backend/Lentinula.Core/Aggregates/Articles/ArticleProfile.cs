using AutoMapper;

using Lentinula.Core.Aggregates.Articles.Dto;

namespace Lentinula.Core.Aggregates.Articles;

public class ArticleProfile : Profile
{
    public ArticleProfile()
    {
        CreateMap<Article, ArticleInfoDto>();
        CreateMap<Article, ArticleDto>();
        CreateMap<Article, ArticleRecycleBinDto>();

        CreateMap<ArticleAddDto, Article>();
        CreateMap<ArticleUpdateDto, Article>();
    }
}
