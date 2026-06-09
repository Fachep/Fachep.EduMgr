using System.ComponentModel.DataAnnotations;
using Fachep.EduMgr.Infrastructure.Data;
using NpgsqlTypes;

namespace Fachep.EduMgr.Entities;

public class Schedule : Entity<Guid>, IHasOwner<long, Course>
{
    public Schedule()
    {
    }

    public Schedule(Guid id) : base(id)
    {
    }

    public NpgsqlRange<int>[] Weeks { get; set; } = [];
    public NpgsqlRange<int>[] Days { get; set; } = [];
    public NpgsqlRange<int>[] Sections { get; set; } = [];
    public string? Location { get; set; }

    [Required] public long? OwnerId { get; set; }

    public Course Owner { get; set; } = null!;
}
