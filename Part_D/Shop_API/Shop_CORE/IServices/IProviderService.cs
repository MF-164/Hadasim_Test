using Shop_CORE.VMs;
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
        Task<ProviderVm> CreateProviderAsync(ProviderVm providerVm);
        Task<ProviderVm> GetProviderByIdAsync(int id);
        Task<List<ProviderVm>> GetAllProvidersAsync();
        Task<ProviderVm> LoginAsync(ProviderVm providerVm);
    }
}
