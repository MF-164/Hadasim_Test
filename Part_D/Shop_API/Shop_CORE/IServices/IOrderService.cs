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
        Task<OrderVm> CreateOrderAsync(OrderVm orderVm);
        Task<List<OrderVm>> GetByProviderIdAsync(int providerId);
        Task<List<OrderVm>> GetAllOrdersAsync();
        Task<OrderVm> GetOrderByIdAsync(int id);
        Task<OrderVm> UpdateOrderStatusAsync(int orderId, string newStatus);
    }
}
