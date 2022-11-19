using Lentinula.Blazor.Common;
using Lentinula.Blazor.HttpClients;
using Lentinula.Utils.Helpers;

namespace Lentinula.Blazor.Extensions;

public static class ServiceExtension
{
    public static IServiceCollection AddHttpClients(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApiClientOption>(configuration.GetSection(nameof(ApiClientOption)));

        var types = ReflectionHelper.Instance.AllNormalTypes
            .Where(type => typeof(IBasicApiClient).IsAssignableFrom(type));

        foreach (var type in types)
        {
            services.AddScoped(type);
        }

        return services;
    }
}
