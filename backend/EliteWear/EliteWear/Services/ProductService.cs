using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class ProductService
    {
        private readonly EliteWearDbContext _context;

        public ProductService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.Find(product => true).ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products.Find(product => product.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateProductAsync(Product product)
        {
            await _context.Products.InsertOneAsync(product);
        }

        public async Task UpdateProductAsync(int id, Product updatedProduct)
        {
            await _context.Products.ReplaceOneAsync(product => product.Id == id, updatedProduct);
        }

        public async Task DeleteProductAsync(int id)
        {
            await _context.Products.DeleteOneAsync(product => product.Id == id);
        }
    }
}
