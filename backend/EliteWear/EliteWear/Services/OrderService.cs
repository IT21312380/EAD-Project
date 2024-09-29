﻿using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class OrderService
    {
        private readonly EliteWearDbContext _context;

        public OrderService(EliteWearDbContext context)
        {
            _context = context;
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
            await _context.Orders.InsertOneAsync(order);
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
