using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class PaymentService
    {
        private readonly EliteWearDbContext _context;

        public PaymentService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> GetPaymentsAsync()
        {
            return await _context.Payments.Find(payment => true).ToListAsync();
        }

        public async Task<Payment?> GetPaymentByIdAsync(int id)
        {
            return await _context.Payments.Find(payment => payment.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreatePaymentAsync(Payment payment)
        {
            await _context.Payments.InsertOneAsync(payment);
        }

        public async Task UpdatePaymentAsync(int id, Payment updatedPayment)
        {
            await _context.Payments.ReplaceOneAsync(payment => payment.Id == id, updatedPayment);
        }

        public async Task DeletePaymentAsync(int id)
        {
            await _context.Payments.DeleteOneAsync(payment => payment.Id == id);
        }
    }
}
