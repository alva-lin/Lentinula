using Lentinula.Api.Common;
using Lentinula.Core.Aggregates.Users.Dto;
using Lentinula.Core.Aggregates.Users.Services;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lentinula.Api.Controllers;

/// <summary>
///     用户账户控制器
/// </summary>
public class UserController : BasicController
{
    /// <summary>
    ///     用户注册
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="userService"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost]
    [Route("[action]")]
    public async Task<ResponseResult<VoidObject>> Register([FromBody] RegisterDto dto, IUserService userService, CancellationToken cancellationToken)
    {
        await userService.Register(dto, cancellationToken);
        return VoidObject.Instance;
    }

    /// <summary>
    ///     用户登录
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="userService"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost]
    [Route("[action]")]
    public async Task<ResponseResult<string>> Login([FromBody] LoginDto dto, IUserService userService, CancellationToken cancellationToken)
    {
        return await userService.Login(dto, cancellationToken);
    }
}
