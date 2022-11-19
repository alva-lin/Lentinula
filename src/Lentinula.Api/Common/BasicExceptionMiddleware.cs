﻿using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

namespace Lentinula.Api.Common;

public class BasicExceptionMiddleware
{
    private readonly ILogger<BasicExceptionMiddleware> _logger;
    private readonly RequestDelegate _next;

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
#if DEBUG
            var result = ResponseResult.Error(e.ErrorInfos, e.Code, e.Message, e.StackTrace);
#else
            var result = ResponseEmptyResult.Error(e.Code, e.Message);
#endif
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
#if DEBUG
            var result = ResponseResult.Error<object>(null, ResponseCode.Error, e.Message, e.StackTrace);
#else
            var result = ResponseEmptyResult.Error(code);
#endif
            await context.Response.WriteAsJsonAsync(result, cancellationToken);

            _logger.LogError(e, "{Code} {Message} {Info}",
                code,
                e.Message,
                e.StackTrace);
        }
    }
}
