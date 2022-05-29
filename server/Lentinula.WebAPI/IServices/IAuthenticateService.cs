using Lentinula.WebAPI.DTO;

namespace Lentinula.WebAPI.IServices;

public interface IAuthenticateService
{
    Task<TokenResponse> IsAuthenticated(LoginRequest request);
}
