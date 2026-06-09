using Fachep.EduMgr.Infrastructure.Data;

namespace Fachep.EduMgr.Entities;

public class User : Entity<long>, IHasName
{
    public User()
    {
        UserRole = UserRole.Admin;
    }

    public User(long id) : base(id)
    {
        UserRole = UserRole.Admin;
    }

    public User(UserRole userRole)
    {
        UserRole = userRole;
    }

    public User(long id, UserRole userRole) : base(id)
    {
        UserRole = userRole;
    }

    public string? Email { get; set; }
    public string? NormalizedEmail { get; set; }
    public string? PhoneNumber { get; set; }

    public string? PasswordHash { get; set; }

    public string? SecurityStamp { get; set; }

    public UserRole UserRole { get; set; }
    public string? NormalizedName { get; set; }

    public virtual ICollection<UserToken> Tokens { get; } = [];

    public string? Name { get; set; }
}
