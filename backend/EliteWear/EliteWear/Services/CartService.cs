using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class CartService
    {
        private readonly EliteWearDbContext _context;

        public CartService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<List<Cart>> GetCartsAsync()
        {
            return await _context.Carts.Find(cart => true).ToListAsync();
        }

        public async Task<Cart?> GetCartByIdAsync(int id)
        {
            return await _context.Carts.Find(cart => cart.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateCartAsync(Cart cart)
        {
            await _context.Carts.InsertOneAsync(cart);
        }

        public async Task UpdateCartAsync(int id, Cart updatedCart)
        {
            await _context.Carts.ReplaceOneAsync(cart => cart.Id == id, updatedCart);
        }

        public async Task DeleteCartAsync(int id)
        {
            await _context.Carts.DeleteOneAsync(cart => cart.Id == id);
        }
        public async Task<bool> RemoveCartItemAsync(int cartId, int cartItemId)
        {
            // Find the cart by its ID
            var cart = await _context.Carts.Find(c => c.Id == cartId).FirstOrDefaultAsync();
            if (cart == null || cart.Items == null)
            {
                return false; // Cart or cart items not found
            }

            // Find the item to remove based on cartItemId
            var cartItem = cart.Items.FirstOrDefault(item => item.Id == cartItemId);
            if (cartItem == null)
            {
                return false; // Cart item not found
            }

            // Remove the item
            cart.Items.Remove(cartItem);

            // Recalculate the total price
            cart.TotalPrice = cart.Items.Sum(item => item.Price * item.Quantity);

            // Update the cart in the database
            var result = await _context.Carts.ReplaceOneAsync(c => c.Id == cartId, cart);

            return result.ModifiedCount > 0; // Return true if the update was successful
        }

    }
}
