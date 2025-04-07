using Shop_DATA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shop_CORE.VMs;

namespace Shop_CORE.IServices
{
    public interface IOrderService
    {
        Task CreateOrderAsync(OrderVm order);
        Task<List<OrderVm>> GetAllOrdersAsync();
        Task<OrderVm> GetOrderByIdAsync(int id);
    }
}
