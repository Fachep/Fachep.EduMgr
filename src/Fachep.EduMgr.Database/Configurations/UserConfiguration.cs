using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fachep.EduMgr.Database.Configurations;

internal class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.UseTphMappingStrategy()
            .HasDiscriminator(u => u.UserRole)
            .HasValue<Student>(UserRole.Student)
            .HasValue<Teacher>(UserRole.Teacher)
            .HasValue<User>(UserRole.User)
            .HasValue<Admin>(UserRole.Admin)
            .IsComplete();

        builder.HasIndex(u => u.UserRole);

        builder.Property(u => u.Id)
            .ValueGeneratedNever();
    }
}
