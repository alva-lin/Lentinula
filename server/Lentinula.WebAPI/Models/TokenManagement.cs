using Newtonsoft.Json;

namespace Lentinula.WebAPI.Models;

public class TokenManagement
{
    [JsonProperty("secret")]
    public string Secret { get; set; } = string.Empty;
    
    [JsonProperty("issuer")]
    public string Issuer { get; set; } = string.Empty;
    
    [JsonProperty("audience")]
    public string Audience { get; set; } = string.Empty;
    
    [JsonProperty("accessExpiration")]
    public int AccessExpiration { get; set; }
    
    [JsonProperty("refreshExpiration")]
    public int RefreshExpiration { get; set; }
}
