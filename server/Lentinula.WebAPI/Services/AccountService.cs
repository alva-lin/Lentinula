using Lentinula.WebAPI.DTO;
using Lentinula.WebAPI.IServices;

namespace Lentinula.WebAPI.Services;

public class AccountService : IAccountService
{
    public bool IsValid(LoginRequest request)
    {
        return true;
    }
}
