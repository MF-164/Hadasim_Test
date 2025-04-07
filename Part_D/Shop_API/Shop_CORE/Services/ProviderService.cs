using Shop_CORE.IServices;
using Shop_DATA.IRepositories;
using Shop_DATA.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_CORE.Services
{
    public class ProviderService : IProviderService
    {
        private readonly IProviderRepository _providerRepository;

        public ProviderService(IProviderRepository providerRepository)
        {
            _providerRepository = providerRepository;
        }

        public async Task CreateProviderAsync(Provider provider)
        {
            try
            {
                if (provider == null)
                {
                    throw new ArgumentNullException(nameof(provider), "Provider cannot be null.");
                }
                ValidateProvider(provider);
                await _providerRepository.CreateAsync(provider);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateProviderAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        public async Task<Provider> GetProviderByIdAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Invalid provider ID");
                }

                var provider = await _providerRepository.GetByIdAsync(id);
                if (provider == null)
                {
                    throw new Exception($"Provider with ID {id} not found.");
                }

                return provider;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetProviderByIdAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        public async Task<List<Provider>> GetAllProvidersAsync()
        {
            try
            {
                return await _providerRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetAllProvidersAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        public async Task ValidateProvider(Provider provider)
        {
            if (provider == null)
            {
                throw new ArgumentNullException(nameof(provider), "Provider cannot be null.");
            }

            if (string.IsNullOrWhiteSpace(provider.CompanyName))
            {
                throw new ArgumentException("Company name cannot be null or empty.");
            }

            if (string.IsNullOrWhiteSpace(provider.Phone))
            {
                throw new ArgumentException("Phone cannot be null or empty.");
            }

            if (string.IsNullOrWhiteSpace(provider.RepresentativeName))
            {
                throw new ArgumentException("Representative name cannot be null or empty.");
            }
        }
    }
}
