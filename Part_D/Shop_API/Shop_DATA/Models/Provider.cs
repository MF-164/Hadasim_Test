using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_DATA.Models
{
    public class Provider
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Phone { get; set; }
        public string RepresentativeName { get; set; }
        public virtual List<Order>? Orders { get; set; } = new List<Order>();
        public virtual List<Product>? Products { get; set; } = new List<Product>();
    }
}
