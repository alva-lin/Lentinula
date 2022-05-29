using Lentinula.WebAPI.DTO;
using Lentinula.WebAPI.IServices;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lentinula.WebAPI.Controllers;

/// <summary>
/// 验证控制器
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : Controller
{
    private readonly IAuthenticateService _authService;


    public AuthenticationController(IAuthenticateService authService)
    {
        _authService = authService;
    }


    [AllowAnonymous]
    [HttpPost, Route("requesttoken")]
    public async Task<ActionResult> RequestToken([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("无效的请求");
        }

        var token = await _authService.IsAuthenticated(request);
        if (!string.IsNullOrWhiteSpace(token.Token))
        {
            return Ok(token);
        }

        return BadRequest("账户或密码错误");
    }
}
