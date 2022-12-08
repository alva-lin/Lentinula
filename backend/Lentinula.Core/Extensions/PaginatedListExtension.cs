using Lentinula.Utils.Common;

using Microsoft.EntityFrameworkCore;

namespace Lentinula.Core.Extensions;

public static class PaginatedListExtension
{
    public static async Task<PaginatedList<T>> ToPaginatedListAsync<T>(this IQueryable<T> source, uint pageNumber, uint pageSize, CancellationToken token = default)
    {
        var count = await source.LongCountAsync(token);
        var items = await source.Skip((int)((pageNumber - 1) * pageSize)).Take((int)pageSize).ToListAsync(token);

        return new(items, count, pageNumber, pageSize);
    }

    public static PaginatedList<T> ToPaginatedList<T>(this IQueryable<T> source, uint pageNumber, uint pageSize)
    {
        var count = source.LongCount();
        var items = source.Skip((int)((pageNumber - 1) * pageSize)).Take((int)pageSize).ToList();

        return new(items, count, pageNumber, pageSize);
    }
}
