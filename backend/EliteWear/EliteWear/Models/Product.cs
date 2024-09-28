using MongoDB.Bson.Serialization.Attributes;

namespace EliteWear.Models
{
    public class Product
    {
        // Static variable to keep track of the last used ID (not thread-safe)
        private static int _lastId;

        [BsonId]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public string? Category { get; set; }

        public int Quantity { get; set; }

        public int VendorId { get; set; }

        public Product()
        {
            Id = GetNextId();
        }

        // Method to get the next ID
        private static int GetNextId()
        {
            return ++_lastId; // Increment and return the next ID
        }
    }
}
