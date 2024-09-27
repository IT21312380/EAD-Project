namespace EliteWear.Models
{
    public class Payment
    {
        public int Id { get; set; } 
        public string? CardType { get; set; }
        public double Amount { get; set; }
        public string? BillingAddress { get; set; }
        public string? ExpireDate { get; set;}

    }
}
