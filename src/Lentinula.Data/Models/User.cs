using System.ComponentModel.DataAnnotations;

using Lentinula.Data.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lentinula.Data.Models;

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

public sealed class UserEntityConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasIndex(user => user.Account).IsUnique();
        builder.HasIndex(user => user.NickName).IsUnique();
    }
}
