using Shop_DATA.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_DATA.IRepositories
{
    public interface IProviderRepository
    {
        Task CreateAsync(Provider provider);
        Task<List<Provider>> GetAllAsync();
        Task<Provider> GetByIdAsync(int id);
    }
}
