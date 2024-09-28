using MongoDB.Driver;
using EliteWear.Models;
using Microsoft.Extensions.Options;
using EliteWear.Data;

namespace EliteWear.Services
{
    public class EliteWearDbContext
    {
        private readonly IMongoDatabase _database;

        public EliteWearDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Payment> Payments => _database.GetCollection<Payment>("Payments");
        public IMongoCollection<Order> Orders => _database.GetCollection<Order>("Orders");
        public IMongoCollection<Product> Products => _database.GetCollection<Product>("Products");
        public IMongoCollection<User> Users => _database.GetCollection<User>("User");
        public IMongoCollection<Admin> Admin => _database.GetCollection<Admin>("Admin");

        public IMongoCollection<Vendor> Vendor => _database.GetCollection<Vendor>("Vendor");

        public IMongoCollection<CSR> CSR => _database.GetCollection<CSR>("CSR");
    }
   
}
namespace EliteWear.Data
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
    }
}
