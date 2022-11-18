using Lentinula.Blazor.Common;

namespace Lentinula.Blazor.Extensions;

public static class ServiceExtension
{
    public static IServiceCollection AddHttpClientFromConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var section = configuration.GetSection("HttpClients");
        var list = section.Get<HttpClientConfig[]>() ?? Array.Empty<HttpClientConfig>();
        foreach (var (name, uri) in list)
        {
            services.AddHttpClient(name, client => client.BaseAddress = new Uri(uri));
        }

        return services;
    }
}
