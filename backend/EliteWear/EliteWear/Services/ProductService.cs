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
            // No need to set Id here, it is handled in the Product constructor
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

        public async Task DeductProductQuantityAsync(int productId, int quantityToDeduct)
        {
            var filter = Builders<Product>.Filter.Eq(product => product.Id, productId);
            var update = Builders<Product>.Update.Inc(product => product.Quantity, -quantityToDeduct); // Deduct the quantity

            var result = await _context.Products.UpdateOneAsync(filter, update);

            if (result.ModifiedCount == 0)
            {
                throw new Exception($"Product with ID {productId} not found or quantity unchanged.");
            }
        }

    }
}
