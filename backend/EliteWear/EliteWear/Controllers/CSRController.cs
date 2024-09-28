using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/csr")]
public class CSRController : ControllerBase
{
    private readonly CSRService _csrService;

    public CSRController(CSRService csrService)
    {
        _csrService = csrService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterCSRDto cdto)
    {
        if (!await _csrService.RegisterCSR(cdto.Username, cdto.Password))
            return BadRequest("Username already exists.");

        return Ok("CSR registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCSRDto cdto)
    {
        var csr = await _csrService.AuthenticateCSR(cdto.Username, cdto.Password);
        if (csr == null)
            return Unauthorized("Invalid username or password.");

        return Ok("Login successful.");
    }






}

public class RegisterCSRDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class LoginCSRDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}
