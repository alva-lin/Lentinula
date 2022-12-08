namespace Lentinula.Utils.Common;

/// <summary>
/// 分页列表
/// </summary>
/// <typeparam name="T"></typeparam>
public class PaginatedList<T>
{
    /// <summary>
    /// 列表数据
    /// </summary>
    public List<T> Data { get; protected set; } = new();

    /// <summary>
    /// 总数量
    /// </summary>
    public long TotalCount { get; protected set; }

    /// <summary>
    /// 总的页数
    /// </summary>
    public uint TotalPages { get; protected set; }

    /// <summary>
    /// 当前页码
    /// </summary>
    public uint CurrentPage { get; protected set; }

    /// <summary>
    /// 一页里的数据量
    /// </summary>
    public uint PageSize { get; protected set; }

    /// <summary>
    /// 是否有前一页
    /// </summary>
    public bool HasPrev => CurrentPage > 1;

    /// <summary>
    /// 是否有下一页
    /// </summary>
    public bool HasNext => CurrentPage < TotalPages;

    /// <summary>
    /// AutoMapper 需要一个无参构造函数
    /// </summary>
    protected PaginatedList() { }

    public PaginatedList(List<T> items, long count, uint pageNumber, uint pageSize)
    {
        Data        = items;
        TotalCount  = count;
        CurrentPage = pageNumber;
        PageSize    = pageSize;
        TotalPages  = (uint)Math.Ceiling(count / (double)pageSize);
    }

    public static PaginatedList<T> Create(IQueryable<T> source, uint pageNumber, uint pageSize)
    {
        var count = source.LongCount();
        var items = source.Skip((int)((pageNumber - 1) * pageSize)).Take((int)pageSize).ToList();

        return new(items, count, pageNumber, pageSize);
    }
}
