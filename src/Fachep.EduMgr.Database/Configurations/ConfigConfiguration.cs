using System.Text.Json;
using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fachep.EduMgr.Database.Configurations;

internal class ConfigConfiguration : IEntityTypeConfiguration<Config>
{
    private static readonly ValueComparer<List<SectionInfo>> SectionInfoListComparer =
        new(
            (s1, s2) => s1.SequenceEqual(s2),
            s => s.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            s => s.ToList());

    public void Configure(EntityTypeBuilder<Config> builder)
    {
        builder.Property(c => c.Sections)
            .HasConversion(
                c => JsonSerializer.Serialize(c),
                s => JsonSerializer.Deserialize<List<SectionInfo>>(s)!,
                SectionInfoListComparer);

        builder.HasData(new Config
        {
            StartDayOfWeek = DayOfWeek.Monday,
            StartDate = new DateOnly(DateTime.Now.Year, 9, 1),
            Sections =
            [
                new SectionInfo(new TimeOnly(8, 10), new TimeOnly(8, 55)),
                new SectionInfo(new TimeOnly(9, 5), new TimeOnly(9, 50)),
                new SectionInfo(new TimeOnly(10, 10), new TimeOnly(10, 55)),
                new SectionInfo(new TimeOnly(11, 5), new TimeOnly(11, 50)),
                new SectionInfo(new TimeOnly(14, 40), new TimeOnly(15, 25)),
                new SectionInfo(new TimeOnly(15, 35), new TimeOnly(16, 20)),
                new SectionInfo(new TimeOnly(16, 30), new TimeOnly(17, 15)),
                new SectionInfo(new TimeOnly(17, 25), new TimeOnly(18, 10)),
                new SectionInfo(new TimeOnly(19, 30), new TimeOnly(20, 15)),
                new SectionInfo(new TimeOnly(20, 25), new TimeOnly(21, 10)),
                new SectionInfo(new TimeOnly(12, 30), new TimeOnly(13, 15)),
                new SectionInfo(new TimeOnly(13, 25), new TimeOnly(14, 10))
            ]
        });
    }
}
