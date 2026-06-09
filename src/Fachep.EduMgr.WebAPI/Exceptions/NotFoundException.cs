namespace Fachep.EduMgr.WebAPI.Exceptions;

public class NotFoundException : Exception
{
    public override string Message => "The requested resource was not found.";
}
