namespace Fachep.EduMgr.Background.Configurations;

public class ExpirationOption : Dictionary<string, ExpirationOption.PerContextOption>
{
    public class PerContextOption
    {
        public List<string> Assemblies { get; set; } = [];
        public Dictionary<string, bool> ExcludeEntities { get; set; } = new();
        public Dictionary<string, string> Schedules { get; set; } = new();
    }
}
