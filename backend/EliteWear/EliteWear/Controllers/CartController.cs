using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{
    private readonly CartService _cartService;

    public CartController(CartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCarts()
    {
        var carts = await _cartService.GetCartsAsync();
        return Ok(carts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCart(int id)
    {
        var cart = await _cartService.GetCartByIdAsync(id);
        if (cart == null)
            return NotFound();
        return Ok(cart);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCart([FromBody] Cart cart)
    {
        await _cartService.CreateCartAsync(cart);
        return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cart);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCart(int id, [FromBody] Cart updatedCart)
    {
        await _cartService.UpdateCartAsync(id, updatedCart);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCart(int id)
    {
        await _cartService.DeleteCartAsync(id);
        return NoContent();
    }
}
