using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_DATA.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int MinQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public int ProviderId { get; set; } // Foreign key to the provider table
        public virtual Provider? Provider { get; set; } // Navigation property
    }
}
