using System.Net.Http.Json;
using System.Web;

using Lentinula.Blazor.Common;
using Lentinula.Core.Aggregates.Articles.Dto;
using Lentinula.Utils.Common.Response;

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;

namespace Lentinula.Blazor.HttpClients;

public class ArticleApiClient : BasicApiClient
{
    public ArticleApiClient(HttpClient http, IOptions<ApiClientOption> option, NavigationManager navigationManager)
        : base(http, option, navigationManager)
    {
    }

    /// <summary>
    ///     获取文章列表
    /// </summary>
    /// <param name="pageIndex"></param>
    /// <param name="pageSize"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<List<ArticleInfoDto>> GetArticlesAsync(uint pageIndex, uint pageSize, CancellationToken cancellationToken = default)
    {
        var query = new Dictionary<string, object?>()
        {
            ["pageIndex"] = pageIndex,
            ["pageSize"]  = pageSize
        };
        var data = await RequestAsync<List<ArticleInfoDto>>(HttpMethod.Get, "Article", query, cancellationToken: cancellationToken) ?? new();

        return data;
    }
    
    /// <summary>
    ///     获取文章详情
    /// </summary>
    /// <returns></returns>
    public async Task<ArticleDto?> GetArticleAsync(long id, CancellationToken cancellationToken = default)
    {
        var article = await RequestAsync<ArticleDto>(HttpMethod.Get, $"Article/{id}", cancellationToken: cancellationToken) ?? null;
        return article;
    }
}
