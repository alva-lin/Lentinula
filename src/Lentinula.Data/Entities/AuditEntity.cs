// ReSharper disable RedundantExtendsListEntry

using System.ComponentModel.DataAnnotations;

namespace Lentinula.Data.Entities;

public abstract class AuditEntity<TKey> : BasicEntity<TKey>, IBasicEntity<TKey>, IAuditable where TKey : IEquatable<TKey>
{
    /// <summary>
    /// 创建人
    /// </summary>
    [StringLength(100)]
    public string CreatedBy { get; set; } = string.Empty;

    /// <summary>
    /// 创建时间
    /// </summary>
    public DateTime CreationTime { get; set; }

    /// <summary>
    /// 修改人
    /// </summary>
    [StringLength(100)]
    public string ModifiedBy { get; set; } = string.Empty;

    /// <summary>
    /// 修改时间
    /// </summary>
    public DateTime? ModifiedTime { get; set; }
}
