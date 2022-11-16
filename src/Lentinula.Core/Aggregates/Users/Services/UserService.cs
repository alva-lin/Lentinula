using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Lentinula.Core.Aggregates.Users.Dto;
using Lentinula.Core.Options;
using Lentinula.Utils.Common;
using Lentinula.Utils.Common.Response;
using Lentinula.Utils.Helpers;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Lentinula.Core.Aggregates.Users.Services;

public class UserService : IUserService
{
    private readonly LentinulaDbContext _dbContext;

    private readonly JwtOption _jwtOption;

    public UserService(LentinulaDbContext dbContext, IOptions<JwtOption> jwtOption)
    {
        _dbContext = dbContext;
        _jwtOption = jwtOption.Value;
    }

    public async Task<bool> Register(RegisterDto dto, CancellationToken cancellationToken = default)
    {
        if (await _dbContext.Users.AnyAsync(user => user.Account == dto.Account, cancellationToken))
        {
            throw new BasicException(ResponseCode.Fail, "该账号已被注册");
        }
        if (await _dbContext.Users.AnyAsync(user => user.NickName == dto.NickName, cancellationToken))
        {
            throw new BasicException(ResponseCode.Fail, "该用户名已被占用");
        }

        var salt = CryptoHelper.Md5(dto.Account, dto.NickName, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture), new Random().Next(int.MaxValue).ToString());

        var user = new User
        {
            Account  = dto.Account,
            NickName = dto.NickName,
            Password = CryptoHelper.Md5(dto.Password, salt),
            Salt     = salt
        };
        await _dbContext.Users.AddAsync(user, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<string> Login(LoginDto dto, CancellationToken cancellationToken)
    {
        if (!await IsValid(dto, cancellationToken))
        {
            throw new BasicException(ResponseCode.Fail, "登录失败，请检查账户或密码是否正确");
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, dto.Account)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOption.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiration = DateTime.UtcNow.AddSeconds(_jwtOption.AccessExpiration);
        var jwtToken = new JwtSecurityToken(
            _jwtOption.Issuer,
            _jwtOption.Audience,
            claims,
            expires: expiration,
            signingCredentials: credentials
            );

        var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

        return token;
    }

    private async Task<bool> IsValid(LoginDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Account == dto.Account, cancellationToken);

        if (user != null)
        {
            var hash = CryptoHelper.Md5(dto.Password, user.Salt);
            if (user.Password == hash)
            {
                return true;
            }
        }
        return false;
    }
}
