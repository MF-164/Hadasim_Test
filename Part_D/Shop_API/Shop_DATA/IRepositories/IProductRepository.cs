using System.Collections.Generic;
using System.Threading.Tasks;
using Shop_DATA.Models;

namespace Shop_DATA.IRepositories
{
    public interface IProductRepository
    {
        Task<Product> CreateAsync(Product product);
        Task<Product> GetByIdAsync(int id);
        Task<List<Product>> GetByProviderAsync(int providerId);
        Task<List<Product>> GetAllAsync();
    }
}
