﻿using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

namespace Lentinula.Api.Common;

public class BasicExceptionMiddleware
{
    private readonly ILogger<BasicExceptionMiddleware> _logger;
    private readonly RequestDelegate                   _next;

    public BasicExceptionMiddleware(RequestDelegate next, ILogger<BasicExceptionMiddleware> logger)
    {
        _next   = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var cancellationToken = context.RequestAborted;
        try
        {
            await _next(context);
        }
        catch (BasicException e)
        {
            ResponseResult<dynamic> result = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ?
                ResponseResult.Error(e.ErrorInfos, e.Code, e.Message, e.StackTrace) :
                ResponseEmptyResult.Error(e.Code, e.Message);

            await context.Response.WriteAsJsonAsync(result, cancellationToken);

            _logger.LogError(e, "{Code} {Message} {Info}",
                e.Code,
                e.Message,
                e.ErrorInfos);
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("request canceled");
        }
        catch (Exception e)
        {
            var code = ResponseCode.Error;

            ResponseResult<object> result = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ?
                ResponseResult.Error<object>(VoidObject.Instance, code, e.Message, e.StackTrace) :
                ResponseResult.Error<object>(VoidObject.Instance, code, e.Message);

            await context.Response.WriteAsJsonAsync(result, cancellationToken);

            _logger.LogError(e, "{Code} {Message} {Info}",
                code,
                e.Message,
                e.StackTrace);
        }
    }
}
