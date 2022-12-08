using AutoMapper;

using Lentinula.Utils.Common;

namespace Lentinula.Core;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap(typeof(PaginatedList<>), typeof(PaginatedList<>));
    }
}
