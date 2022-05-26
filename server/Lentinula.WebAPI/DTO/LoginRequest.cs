using System.ComponentModel.DataAnnotations;

using Newtonsoft.Json;

namespace Lentinula.WebAPI.DTO;

public class LoginRequest
{
    [Required]
    [JsonProperty("username")]
    public string UserName { get; set; }

    [Required]
    [JsonProperty("password")]
    public string Password { get; set; }
}
