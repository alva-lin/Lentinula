using Lentinula.Api.Common;

namespace Lentinula.Api.Extensions;

public static class MiddlewaveExtension
{
    public static IApplicationBuilder UseBasicException(this IApplicationBuilder host)
    {
        host.UseMiddleware<BasicExceptionMiddleware>();

        return host;
    }
}
