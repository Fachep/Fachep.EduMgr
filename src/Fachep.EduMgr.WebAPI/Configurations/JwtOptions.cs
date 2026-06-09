using Microsoft.IdentityModel.Tokens;

namespace Fachep.EduMgr.WebAPI.Configurations;

public class JwtOptions
{
    public JwtGeneratorOptions AccessToken { get; set; } = new()
    {
        Expiration = TimeSpan.FromMinutes(10)
    };

    public JwtGeneratorOptions RefreshToken { get; set; } = new()
    {
        Expiration = TimeSpan.FromDays(7)
    };

    public class JwtGeneratorOptions
    {
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public TimeSpan Expiration { get; set; }

        public JsonWebKey SigningKey { get; set; } = new();
        public string Algorithm { get; set; } = SecurityAlgorithms.HmacSha256;
    }
}
