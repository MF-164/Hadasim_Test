using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_DATA.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Quantity { get; set; }
        public string Status { get; set; } = "New";
        public int ProductId { get; set; } // Foreign key to the product table
        public virtual Product? Product { get; set; } // Navigation property
        public int ProviderId { get; set; } // Foreign key to the provider table
        public virtual Provider? Provider { get; set; } // Navigation property
    }
}
// Compare this snippet from Shop_DATA/Models/ShopContext.cs: