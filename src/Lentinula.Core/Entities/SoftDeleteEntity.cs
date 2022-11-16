// ReSharper disable RedundantExtendsListEntry

using System.ComponentModel.DataAnnotations;

namespace Lentinula.Core.Entities;

public abstract class SoftDeleteEntity<TKey> : AuditEntity<TKey>, IBasicEntity<TKey>, ISoftDelete where TKey : IEquatable<TKey>
{
    /// <summary>
    ///     是否删除
    /// </summary>
    public bool IsDelete { get; set; }

    /// <summary>
    ///     删除人
    /// </summary>
    [StringLength(100)]
    public string? DeletedBy { get; set; }

    /// <summary>
    ///     删除时间
    /// </summary>
    public DateTime? DeletedTime { get; set; }
}
