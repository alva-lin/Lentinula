using Lentinula.Utils.Common;

using Microsoft.EntityFrameworkCore;

namespace Lentinula.Core.Extensions;

public static class PaginatedListExtension
{
    /// <summary>
    /// 获取分页列表
    /// </summary>
    /// <remarks>
    ///     如果查询的页码大于最后一页，那么会查询最后一页
    /// </remarks>
    /// <param name="source"></param>
    /// <param name="pageNumber"></param>
    /// <param name="pageSize"></param>
    /// <param name="token"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static async Task<PaginatedList<T>> ToPaginatedListAsync<T>(this IQueryable<T> source, uint pageNumber, uint pageSize, CancellationToken token = default)
    {
        var count = await source.LongCountAsync(token);

        // 页码不能超过最后一页
        var totalPages = (uint)Math.Ceiling(count / (double)pageSize);
        pageNumber = Math.Max(Math.Min(pageNumber, totalPages), 1);
        
        var take = Math.Max(pageSize, 1);
        var skip = (pageNumber - 1) * pageSize;

        var items = await source.Skip((int)skip).Take((int)take).ToListAsync(token);

        return new(items, count, pageNumber, take);
    }
}
