using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/vendor")]
public class VendorController : ControllerBase
{
    private readonly VendorService _vendorService;

    public VendorController(VendorService vendorService)
    {
        _vendorService = vendorService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterVendorDto vdto)
    {
        if (!await _vendorService.RegisterVendor(vdto.Username, vdto.Email, vdto.Password))
            return BadRequest("Username already exists.");

        return Ok("User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginVendorDto vdto)
    {
        var vendor = await _vendorService.AuthenticateVendor(vdto.Email, vdto.Password);
        if (vendor == null)
            return Unauthorized("Invalid username or password.");

        return Ok("Login successful.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVendor(string id, [FromBody] Vendor updatedVendor)
    {
        await _vendorService.UpdateVendorAsync(id, updatedVendor);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVendor(string id)
    {
        await _vendorService.DeleteVendorAsync(id);
        return NoContent();
    }




}

public class RegisterVendorDto
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class LoginVendorDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class UpdateVendorDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}
