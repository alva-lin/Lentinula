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
    private IAuthenticateService _authService;


    public AuthenticationController(IAuthenticateService authService)
    {
        _authService = authService;
    }


    [AllowAnonymous]
    [HttpPost, Route("requesttoken")]
    public ActionResult RequestToken([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("无效的请求");
        }

        if (_authService.IsAuthenticated(request, out var token))
        {
            return Ok(token);
        }

        return BadRequest("用户或密码错误");
    }
}
