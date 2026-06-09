using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fachep.EduMgr.Database.Configurations;

internal class SubjectConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.HasOne(s => s.Owner)
            .WithMany(d => d.Subjects)
            .HasForeignKey(s => s.OwnerId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Property(p => p.Id)
            .ValueGeneratedNever();
    }
}
