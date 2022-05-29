using System.ComponentModel.DataAnnotations;

namespace Lentinula.WebAPI.Models;

public class Account
{
    public Guid Id { get; set; }
    
    public string UserName { get; set; }

    public string Password { get; set; }
}
