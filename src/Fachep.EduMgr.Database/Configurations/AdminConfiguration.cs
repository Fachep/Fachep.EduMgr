using Fachep.EduMgr.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fachep.EduMgr.Database.Configurations;

internal class AdminConfiguration : IEntityTypeConfiguration<Admin>
{
    public void Configure(EntityTypeBuilder<Admin> builder)
    {
        builder.HasBaseType<User>();

        // Password: 123456
        builder.HasData(new Admin(1)
        {
            Name = "管理员",
            NormalizedName = "管理员",
            PasswordHash =
                "AQAAAAIAAYagAAAAEAP2Ovb3bO7RxNeAD67N0Q5/FiGNXOHxA25gWhORnntKt9Oznr4AuI7gcAcLao7IQQ==",
            SecurityStamp = "bdf61e19-9203-408e-bfc5-8aa677c32cd1"
        });
    }
}
