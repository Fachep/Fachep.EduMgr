using AutoMapper;
using NpgsqlTypes;

namespace Fachep.EduMgr.WebAPI;

internal class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<NpgsqlRange<int>, int[]>()
            .ConstructUsing(r => new[]
            {
                r.LowerBound + (r.LowerBoundIsInclusive ? 1 : 0), r.UpperBound +
                (r.UpperBoundIsInclusive ? 0 : 1)
            })
            .ReverseMap()
            .ConstructUsing(a => new NpgsqlRange<int>(a[0], true, a[1], false));
    }
}
