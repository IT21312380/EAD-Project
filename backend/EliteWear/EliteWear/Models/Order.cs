using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.Collections.ObjectModel;



namespace EliteWear.Models
{
    [Collection("Order")]
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public Collection<Items>? Items { get; set; }      
        public string? TotalPrice { get; set; }
        public string? Status { get; set; }


    }
}
