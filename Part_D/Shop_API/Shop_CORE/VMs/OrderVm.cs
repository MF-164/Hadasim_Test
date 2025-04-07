using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_CORE.VMs
{
    public class OrderVm
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Quantity { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProviderId { get; set; }
        public string ProviderName { get; set; }

    }
}
