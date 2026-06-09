namespace Fachep.EduMgr.Entities;

public class Admin : User
{
    public Admin() : base(UserRole.Admin)
    {
    }

    public Admin(long id) : base(id, UserRole.Admin)
    {
    }
}
