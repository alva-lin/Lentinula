using System.ComponentModel.DataAnnotations;

namespace Lentinula.Core.Aggregates.Users.Dto;

/// <summary>
///     登录账户的数据模型
/// </summary>
public class LoginDto
{
    /// <summary>
    ///     账户名
    /// </summary>
    [Required]
    [MinLength(6)]
    public string Account { get; set; } = null!;

    /// <summary>
    ///     密码
    /// </summary>
    [Required]
    [MinLength(6)]
    public string Password { get; set; } = null!;
}
