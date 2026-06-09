using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fachep.EduMgr.Database.Configurations;

internal class MajorConfiguration : IEntityTypeConfiguration<Major>
{
    public void Configure(EntityTypeBuilder<Major> builder)
    {
        builder.HasOne(m => m.Owner)
            .WithMany(d => d.Majors)
            .HasForeignKey(m => m.OwnerId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
