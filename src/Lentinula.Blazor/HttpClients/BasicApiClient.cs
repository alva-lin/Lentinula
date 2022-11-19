using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Web;

using Lentinula.Blazor.Common;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

using Microsoft.Extensions.Options;

namespace Lentinula.Blazor.HttpClients;

public abstract class BasicApiClient : IBasicApiClient
{
    protected readonly HttpClient Http;

    protected readonly ApiClientOption Option;

    protected Uri BaseUri => new Uri(Option.BaseUrl);

    private const string CLIENT_NAME = "Lentinula";

    protected BasicApiClient(HttpClient http, IOptions<ApiClientOption> option)
    {
        Http   = http;
        Option = option.Value;
    }

    protected async Task<TData> RequestAsync<TData>(HttpMethod method, string apiPath, Dictionary<string, object?>? query = null, HttpContent? content = null)
    {
        Uri uri = new Uri(BaseUri, apiPath);
        if (query != null)
        {
            var queryParse = HttpUtility.ParseQueryString(string.Empty);
            foreach (var key in query.Keys)
            {
                queryParse.Add(key, query[key]!.ToString());
            }
            var ub = new UriBuilder(uri)
            {
                Query = queryParse.ToString()
            };
            uri = ub.Uri;
        }

        var requestMessage = new HttpRequestMessage()
        {
            Method     = method,
            RequestUri = uri,
            Content    = content
        };

        var token = "TOKEN";

        requestMessage.Headers.Authorization = new("Bearer", token);
        requestMessage.Headers.TryAddWithoutValidation("x-custom-client", CLIENT_NAME);

        var response = await Http.SendAsync(requestMessage);

        // TODO - 错误处理机制
        if (response.StatusCode != HttpStatusCode.OK)
        {
            throw new($"访问出错，错误码 {response.StatusCode}");
        }

        // TODO - 返回体解析
        var result = await response.Content.ReadFromJsonAsync<ResponseResult<TData>>();
        if (result == null)
        {
            throw new("访问出错，返回体为空");
        }
        if (result.Code != ResponseCode.Success)
        {
            throw new(result.Message ?? $"访问出错，错误码 {result.Code}");
        }

        // 如果没有出错，结果必为非空
        return (TData)result.Data!;
    }

    protected async Task<bool> RequestWithResultAsync(HttpMethod method, string apiPath, Dictionary<string, object?>? query, HttpContent? content)
    {
        var result = await RequestAsync<VoidObject>(method, apiPath, query, content);
        return result == VoidObject.Instance;
    }
}
