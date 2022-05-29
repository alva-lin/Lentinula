using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;

using Lentinula.WebAPI.DTO;
using Lentinula.WebAPI.IServices;

using Microsoft.EntityFrameworkCore;

namespace Lentinula.WebAPI.Services;

public class AccountService : IAccountService
{
    private readonly LentinulaDbContext _dbContext;


    public AccountService(LentinulaDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<bool> IsValid(LoginRequest request)
    {
        var account = await  _dbContext.Accounts.FirstOrDefaultAsync(x => x.UserName == request.UserName);

        if (account != null)
        {
            var sha256 = SHA256.Create();
            var bytes  = Encoding.UTF8.GetBytes($"{request.UserName}.{request.Password.ToUpper()}");
            var hash   = BitConverter.ToString(sha256.ComputeHash(bytes)).Replace("-", string.Empty);
            
            if (account.Password == hash)
            {
                return true;
            }
        }
        
        return false;
    }
}
