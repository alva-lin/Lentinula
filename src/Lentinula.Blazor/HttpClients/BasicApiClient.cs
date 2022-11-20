using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Web;

using Lentinula.Blazor.Common;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;

namespace Lentinula.Blazor.HttpClients;

public abstract class BasicApiClient : IBasicApiClient
{
    protected readonly HttpClient Http;

    protected readonly ApiClientOption Option;

    protected readonly NavigationManager NavigationManager;

    protected Uri BaseUri => new Uri(Option.BaseUrl);

    private const string CLIENT_NAME = "Lentinula";

    protected BasicApiClient(HttpClient http, IOptions<ApiClientOption> option, NavigationManager navigationManager)
    {
        Http              = http;
        Option            = option.Value;
        NavigationManager = navigationManager;
    }

    /// <summary>
    /// 发送请求
    /// </summary>
    /// <param name="method">接口方法</param>
    /// <param name="apiPath">接口路径</param>
    /// <param name="query">Query 参数</param>
    /// <param name="content">请求内容</param>
    /// <param name="cancellationToken"></param>
    /// <typeparam name="TData">接口返回的数据类型</typeparam>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    protected async Task<TData?> RequestAsync<TData>(HttpMethod method, string apiPath, Dictionary<string, object?>? query = null, HttpContent? content = null,
        CancellationToken cancellationToken = default)
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

        var response = await Http.SendAsync(requestMessage, cancellationToken);

        // TODO - 错误处理机制
        if (response.StatusCode != HttpStatusCode.OK)
        {
            throw new($"访问出错，请求路径 {uri}\n错误码 {response.StatusCode}");
        }

        // TODO - 返回体解析
        var result = await response.Content.ReadFromJsonAsync<ResponseResult<TData>>();
        if (result == null)
        {
            throw new($"访问出错，请求路径 {uri}\n返回体为空");
        }
        if (result.Code != ResponseCode.Success)
        {
            if (result.Code >= ResponseCode.Fail && result.Code < ResponseCode.Error)
            {
                await Console.Error.WriteLineAsync($"请求失败\n请求链接 {uri}\n错误信息 [{result.Code}]{result.Code.ToDescription()}");

                return default;
            }
            else if (result.Code >= ResponseCode.Error)
            {
                throw new Exception($"发生错误\n请求链接 {uri}\n错误信息 [{result.Code}]{result.Code.ToDescription()}");
            }
            else
            {
                throw new Exception($"发生未知错误\n请求链接 {uri}\n错误信息 [{result.Code}]{result.Code.ToDescription()}");
            }
        }

        // 如果没有出错，结果必为非空
        return result.Data;
    }

    protected async Task<bool> RequestWithResultAsync(HttpMethod method, string apiPath, Dictionary<string, object?>? query, HttpContent? content,
        CancellationToken cancellationToken = default)
    {
        var result = await RequestAsync<VoidObject>(method, apiPath, query, content, cancellationToken);
        return result == VoidObject.Instance;
    }
}
