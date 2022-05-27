namespace Lentinula.WebAPI.DTO;

public class TokenResponse
{
    public string Token { get; set; }

    public DateTime ExpireIn { get; set; }
}
