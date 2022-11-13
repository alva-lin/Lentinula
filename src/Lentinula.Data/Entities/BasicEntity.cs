using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#pragma warning disable CS8618
namespace Lentinula.Data.Entities;

public abstract class BasicEntity<TKey> : IBasicEntity<TKey> where TKey : IEquatable<TKey>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public TKey Id { get; set; }
}
