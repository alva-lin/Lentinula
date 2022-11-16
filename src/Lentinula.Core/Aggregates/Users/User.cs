using System.ComponentModel.DataAnnotations;

using Lentinula.Core.Entities;

namespace Lentinula.Core.Aggregates.Users;

public class User : SoftDeleteEntity<long>
{
    [Required]
    [MinLength(6)]
    [MaxLength(40)]
    public string Account { get; set; } = null!;

    [Required]
    [StringLength(32)]
    public string Password { get; set; } = null!;

    [StringLength(32)]
    public string Salt { get; set; } = null!;

    [Required]
    [MinLength(2)]
    [MaxLength(40)]
    public string NickName { get; set; } = null!;
}
