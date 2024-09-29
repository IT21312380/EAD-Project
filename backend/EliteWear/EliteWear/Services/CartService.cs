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
    }
}
