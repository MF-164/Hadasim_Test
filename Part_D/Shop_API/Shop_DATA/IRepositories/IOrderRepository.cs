using System.Collections.Generic;
using System.Threading.Tasks;
using Shop_DATA.Models;

namespace Shop_DATA.IRepositories
{
    public interface IOrderRepository
    {
        Task<Order> CreateAsync(Order order);
        Task<Order> GetByIdAsync(int id);
        Task<List<Order>> GetByProviderIdAsync(int providerId);
        Task<List<Order>> GetAllAsync();
        Task<Order> UpdateStatusAsync(int orderId, string newStatus);
    }
}
