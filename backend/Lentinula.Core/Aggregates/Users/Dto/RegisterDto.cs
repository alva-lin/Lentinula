using System.ComponentModel.DataAnnotations;

namespace Lentinula.Core.Aggregates.Users.Dto;

/// <summary>
///     注册账户的数据模型
/// </summary>
public class RegisterDto
{
    /// <summary>
    ///     账户名
    /// </summary>
    [Required]
    [MaxLength(40)]
    [MinLength(6)]
    public string Account { get; set; } = null!;

    /// <summary>
    ///     密码
    /// </summary>
    [Required]
    [MaxLength(32)]
    [MinLength(6)]
    public string Password { get; set; } = null!;

    /// <summary>
    ///     昵称
    /// </summary>
    [Required]
    [MaxLength(40)]
    [MinLength(2)]
    public string NickName { get; set; } = null!;
}
