using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Lentinula.WebAPI.DTO;
using Lentinula.WebAPI.IServices;
using Lentinula.WebAPI.Models;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Lentinula.WebAPI.Services;

public class TokenAuthenticationService : IAuthenticateService
{
    private IAccountService _accountService;

    private TokenManagement _tokenManagement;


    public TokenAuthenticationService(IOptions<TokenManagement> tokenManagement, IAccountService accountService)
    {
        _tokenManagement = tokenManagement.Value;
        _accountService  = accountService;
    }


    public bool IsAuthenticated(LoginRequest request, out string token)
    {
        token = string.Empty;

        if (!_accountService.IsValid(request))
        {
            return false;
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, request.UserName)
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var jwtToken = new JwtSecurityToken(
            _tokenManagement.Issuer,
            _tokenManagement.Audience,
            claims,
            expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
            signingCredentials: credentials
        );

        token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

        return true;
    }
}
