using Shop_DATA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop_CORE.IServices
{
    public interface IProviderService
    {
        Task CreateProviderAsync(Provider provider);
        Task<Provider> GetProviderByIdAsync(int id);
        Task<List<Provider>> GetAllProvidersAsync();
    }
}
