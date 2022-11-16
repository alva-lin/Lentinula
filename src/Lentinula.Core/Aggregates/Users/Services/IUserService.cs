using Lentinula.Core.Aggregates.Users.Dto;
using Lentinula.Core.Common;
using Lentinula.Utils.Common;
using Lentinula.Utils.Enums;

namespace Lentinula.Core.Aggregates.Users.Services;

/// <summary>
///     用户服务，操作账户等配置
/// </summary>
[LifeScope(LifeScope.Scope)]
public interface IUserService : IBasicService
{
    /// <summary>
    ///     注册账户
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<bool> Register(RegisterDto dto, CancellationToken token);

    /// <summary>
    ///     登录账户，获取 Token
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<string> Login(LoginDto dto, CancellationToken token);
}
