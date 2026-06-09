namespace Fachep.EduMgr.Entities;

public enum UserRole
{
    User,
    Admin,
    Teacher,
    Student
}

public static class UserTypeExtensions
{
    private static readonly Dictionary<UserRole, string> ValueToNormalizedStringDictionary =
        Enum.GetValues<UserRole>()
            .ToDictionary(t => t, t => t.ToString().Normalize().ToUpperInvariant());

    private static readonly Dictionary<string, UserRole> NormalizedStringToValueDictionary =
        ValueToNormalizedStringDictionary.ToDictionary(kv => kv.Value, kv => kv.Key);

    extension(UserRole)
    {
        public static bool TryParseFromNormalizedString(string normalizedString,
            out UserRole userRole)
        {
            return NormalizedStringToValueDictionary.TryGetValue(normalizedString, out userRole);
        }
    }

    extension(UserRole userRole)
    {
        public string ToNormalizedString()
        {
            return ValueToNormalizedStringDictionary[userRole];
        }
    }
}
