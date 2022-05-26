using Lentinula.WebAPI.DTO;

namespace Lentinula.WebAPI.IServices;

public interface IAccountService
{
    bool IsValid(LoginRequest request);
}
