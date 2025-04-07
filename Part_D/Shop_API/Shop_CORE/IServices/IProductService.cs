using Shop_DATA.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_CORE.Services
{
    public interface IProductService
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<List<Product>> GetProductsByProviderAsync(int providerId);
        Task CreateProductAsync(Product product);
        Task ValidateProduct(Product product);
    }
}
