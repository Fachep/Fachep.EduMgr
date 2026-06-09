using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fachep.EduMgr.Database.Configurations;

internal class UserTokenConfiguration : IEntityTypeConfiguration<UserToken>
{
    public void Configure(EntityTypeBuilder<UserToken> builder)
    {
        builder.HasKey(t => new { t.DeviceId, t.OwnerId });

        builder.HasOne(t => t.Owner)
            .WithMany(u => u.Tokens)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
