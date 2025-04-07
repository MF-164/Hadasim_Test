using Shop_DATA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_CORE.IServices
{
    public interface IOrderService
    {
        Task CreateOrderAsync(Order order);
        Task<List<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
    }
}
