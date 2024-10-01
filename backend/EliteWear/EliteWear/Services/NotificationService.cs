using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class NotificationService
    {
        private readonly EliteWearDbContext _context;

        public NotificationService(EliteWearDbContext context)
        {
            _context = context;
        }

        // Method to create a vendor notification
        public async Task CreateCSRNotificationAsync(int customerId, int id, string message)
        {
            var notification = new Notification
            {
                Id = id, // Assign the Id provided by the user
                CustomerId = customerId,
                Message = message,
                NotificationType = "CSR"
            };

            await _context.Notifications.InsertOneAsync(notification);
        }

        // Method to create a customer notification
        public async Task CreateCustomerNotificationAsync(int id, int customerId, string message)
        {
            var notification = new Notification
            {
                Id = id, // Assign the Id provided by the user
                CustomerId = customerId,
                Message = message,
                NotificationType = "Customer"
            };

            await _context.Notifications.InsertOneAsync(notification);
        }

        // Method to retrieve notifications for a specific vendor
        public async Task<List<Notification>> GetNotificationsFromCSRAsync(int customerId)
        {
            return await _context.Notifications
                .Find(notification => notification.CustomerId == customerId && notification.NotificationType == "CSR")
                .ToListAsync();
        }

        // Method to retrieve notifications for a specific customer
        public async Task<List<Notification>> NotificationsFromCustomerAsync()
        {
            return await _context.Notifications
                .Find(notification => notification.NotificationType == "Customer")
                .ToListAsync();
        }
    }
}
