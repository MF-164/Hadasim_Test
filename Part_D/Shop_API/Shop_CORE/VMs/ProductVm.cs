using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_CORE.VMs
{
    public class ProductVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int MinQuantity { get; set; }
        public string? ImageUrl { get; set; } // URL לתמונה של המוצר
        public int ProviderId { get; set; }
        public string ProviderName { get; set; } // ניתן להוסיף את שם הספק להצגה


    }
}
