using Lentinula.WebAPI.DTO;

namespace Lentinula.WebAPI.IServices;

public interface IAuthenticateService
{
    bool IsAuthenticated(LoginRequest request, out TokenResponse token);
}
