using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly AdminService _adminService;

    public AdminController(AdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterAdminDto adto)
    {
        if (!await _adminService.RegisterAdmin(adto.Username, adto.Password))
            return BadRequest("Username already exists.");

        return Ok("Admin registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginAdminDto adto)
    {
        var admin = await _adminService.AuthenticateAdmin(adto.Username, adto.Password);
        if (admin == null)
            return Unauthorized("Invalid username or password.");

        return Ok("Login successful.");
    }

   




}

public class RegisterAdminDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class LoginAdminDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}
