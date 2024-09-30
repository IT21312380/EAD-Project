using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class OrderService
    {
        private readonly EliteWearDbContext _context;
        private readonly ProductService _productService;

        public OrderService(EliteWearDbContext context, ProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _context.Orders.Find(order => true).ToListAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.Find(order => order.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateOrderAsync(Order order)
        {
            foreach (var item in order.Items)
            {
                var product = await _productService.GetProductByIdAsync(item.Id);
                if (product == null)
                {
                    throw new Exception($"Product with ID {item.Id} not found.");
                }

                if (product.Quantity < item.Qty)
                {
                    throw new Exception($"Not enough stock for product {product.Name}. Available: {product.Quantity}, requested: {item.Qty}");
                }
            }

            // If stock is valid, insert the new order into the database
            await _context.Orders.InsertOneAsync(order);

            // Deduct the quantity for each item in the order
            foreach (var item in order.Items)
            {
                await _productService.DeductProductQuantityAsync(item.Id, item.Qty);
            }
        }


        public async Task UpdateOrderAsync(int id, Order updatedOrder)
        {
            await _context.Orders.ReplaceOneAsync(order => order.Id == id, updatedOrder);
        }

        public async Task UpdateOrderStatusAsync(int id, string newStatus)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.Id, id);
            var update = Builders<Order>.Update.Set(order => order.Status, newStatus);

            var result = await _context.Orders.UpdateOneAsync(filter, update);
            if (result.ModifiedCount == 0)
            {
                throw new Exception($"Order with ID {id} not found or status unchanged.");
            }
        }


        public async Task DeleteOrderAsync(int id)
        {
            await _context.Orders.DeleteOneAsync(order => order.Id == id);
        }
    }
}
