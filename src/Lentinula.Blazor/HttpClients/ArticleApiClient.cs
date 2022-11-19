using System.Net.Http.Json;
using System.Web;

using Lentinula.Blazor.Common;
using Lentinula.Core.Aggregates.Articles.Dto;
using Lentinula.Utils.Common.Response;

using Microsoft.Extensions.Options;

namespace Lentinula.Blazor.HttpClients;

public class ArticleApiClient : BasicApiClient
{
    public ArticleApiClient(HttpClient http, IOptions<ApiClientOption> option)
        : base(http, option)
    {
    }

    /// <summary>
    ///     获取文章列表
    /// </summary>
    /// <param name="pageIndex"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    public async Task<List<ArticleInfoDto>> GetArticlesAsync(uint pageIndex, uint pageSize)
    {
        var query = new Dictionary<string, object?>()
        {
            ["pageIndex"] = pageIndex,
            ["pageSize"]  = pageSize
        };
        var data = await RequestAsync<List<ArticleInfoDto>>(HttpMethod.Get, "Article", query);

        return data;
    }
}
