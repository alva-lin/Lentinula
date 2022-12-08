using System.Reflection;

using Lentinula.Api.Common;
using Lentinula.Core.Common;
using Lentinula.Core.Options;
using Lentinula.Utils.Common;
using Lentinula.Utils.Enums;
using Lentinula.Utils.Helpers;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace Lentinula.Api.Extensions;

public static class ServicesExtension
{
    public static void IncludeAllXmlComments(this SwaggerGenOptions options)
    {
        var basePath = Directory.GetParent(Environment.CurrentDirectory);
        if (basePath is { Exists: true })
        {
            var currentAssembly = Assembly.GetCallingAssembly();
            var xmlDocs = currentAssembly.GetReferencedAssemblies()
                .Union(new[] { currentAssembly.GetName() })
                .Select(a => Path.Combine(basePath.FullName, a.Name!, $"{a.Name}.xml"))
                .Where(File.Exists)
                .ToArray();
            Array.ForEach(xmlDocs, s => options.IncludeXmlComments(s));
        }
    }

    /// <summary>
    ///     根据 <see cref="LifeScopeAttribute" /> 来注册服务
    /// </summary>
    public static IServiceCollection AddBasicServiceByLifeScope(this IServiceCollection services)
    {
        var types = ReflectionHelper.Instance.AllNormalTypes
            .Where(type => type.GetInterface(nameof(IBasicService)) != null)
            .ToList();

        foreach (var type in types)
        {
            var lifeScope = type.GetCustomAttribute<LifeScopeAttribute>()?.Scope ?? LifeScope.Transient;


            var implements = type.GetInterfaces()
                .Where(iType => !iType.IsGenericType && iType.Name.EndsWith("Service"))
                .Union(new[] { type });
            foreach (var implement in implements)
            {
                var iScope = implement.GetCustomAttribute<LifeScopeAttribute>()?.Scope ?? lifeScope;

                switch (iScope)
                {
                    case LifeScope.Transient:
                        services.AddTransient(implement, type);
                        break;
                    case LifeScope.Scope:
                        services.AddScoped(implement, type);
                        break;
                    case LifeScope.Singleton:
                        services.AddSingleton(implement, type);
                        break;
                }
            }
        }

        return services;
    }

    public static IServiceCollection AddJwtBearer(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();

        services.Configure<JwtOption>(configuration.GetSection(nameof(JwtOption)));

        services.ConfigureOptions<ConfigureJwtBearerOptions>();

        return services;
    }

    public static IServiceCollection AddCorsSetting(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<CorsOption>(configuration.GetSection(nameof(CorsOption)));

        services.AddCors(options =>
        {
            var serviceProvider = services.BuildServiceProvider();
            var corsOption = serviceProvider!.GetRequiredService<IOptions<CorsOption>>().Value;

            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins(corsOption.AllowOrigins).WithHeaders(corsOption.AllowHeaders);
            });
        });

        return services;
    }

    public static IServiceCollection AddSystemOption(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<SystemOption>(configuration.GetSection(nameof(SystemOption)));

        return services;
    }
}
