using EliteWear.Models;
using EliteWear.Data;
using System.Text;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Security.Cryptography;




namespace EliteWear.Services
{
    public class UserService
    {
        private readonly EliteWearDbContext _context;

        public UserService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterUser(string username, string email, string password)
        {
            var existingUser = await _context.Users.Find(u => u.Username == username).FirstOrDefaultAsync();
            if (existingUser != null)
                return false;

            var user = new User
            {
                Username = username,
                Email = email,
                PasswordHash = HashPassword(password)
            };

            await _context.Users.InsertOneAsync(user);
            return true;
        }

        public async Task<User> AuthenticateUser(string email, string password)
        {
            var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null || !VerifyPassword(password, user.PasswordHash))
                return null;

            return user;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            var hash = HashPassword(password);
            return hash == hashedPassword;
        }


        public async Task UpdateUserAsync(string id, User updatedUser)
        {
            await _context.Users.ReplaceOneAsync(user => user.Id == id, updatedUser);
        }

        public async Task DeleteUserAsync(string id)
        {
            await _context.Users.DeleteOneAsync(user => user.Id == id);
        }

    }
}
