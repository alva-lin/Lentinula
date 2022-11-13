using Lentinula.Api.Common;
using Lentinula.Data.DTO;
using Lentinula.Data.DTO.User;
using Lentinula.Utils.Common;
using Lentinula.Utils.Enums;

namespace Lentinula.Api.IServices;

/// <summary>
/// 用户服务，操作账户等配置
/// </summary>
[LifeScope(LifeScope.Scope)]
public interface IUserService : IBasicService
{
    /// <summary>
    /// 注册账户
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<bool> Register(RegisterDto dto, CancellationToken token);
    
    /// <summary>
    /// 登录账户，获取 Token
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<string> Login(LoginDto dto, CancellationToken token);
}
