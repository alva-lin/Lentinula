using Lentinula.WebAPI.DTO;

namespace Lentinula.WebAPI.IServices;

public interface IAccountService
{
    Task<bool> IsValid(LoginRequest request);
}
