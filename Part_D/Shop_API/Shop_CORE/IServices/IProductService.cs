using Shop_CORE.VMs;
using Shop_DATA.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_CORE.Services
{
    public interface IProductService
    {
        Task<ProductVm> GetProductByIdAsync(int id);
        Task<List<ProductVm>> GetProductsByProviderAsync(int providerId);
        Task CreateProductAsync(ProductVm product);
    }
}
