using System.Collections.Generic;
using System.Threading.Tasks;
using Shop_DATA.Models;

namespace Shop_DATA.IRepositories
{
    public interface IOrderRepository
    {
        Task CreateAsync(Order order);
        Task<Order> GetByIdAsync(int id);
        Task<List<Order>> GetAllAsync();
    }
}
