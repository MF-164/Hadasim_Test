using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Shop_CORE.IServices;
using Shop_CORE.VMs;
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
        private readonly IMapper _mapper;

        public ProviderService(IProviderRepository providerRepository, IMapper mapper)
        {
            _providerRepository = providerRepository;
            _mapper = mapper;
        }

        public async Task<ProviderVm> CreateProviderAsync(ProviderVm providerVm)
        {
            try
            {
                if (providerVm == null)
                {
                    throw new ArgumentNullException(nameof(providerVm), "Provider cannot be null.");
                }
                var provider = _mapper.Map<Provider>(providerVm);
                await ValidateProvider(provider);
                var createdProvider = await _providerRepository.CreateAsync(provider);

                return _mapper.Map<ProviderVm>(createdProvider);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateProviderAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        public async Task<ProviderVm> GetProviderByIdAsync(int id)
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

                return _mapper.Map<ProviderVm>(provider);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetProviderByIdAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        public async Task<List<ProviderVm>> GetAllProvidersAsync()
        {
            try
            {
                var providers = await _providerRepository.GetAllAsync();
                return _mapper.Map<List<ProviderVm>>(providers);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetAllProvidersAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        public async Task<ProviderVm> LoginAsync(ProviderVm providerVm)
        {
            try
            {
                if (providerVm == null)
                {
                    throw new ArgumentNullException(nameof(providerVm), "Provider cannot be null.");
                }

                var provider = await _providerRepository.GetByUsernameAsync(providerVm.Username);
                if (provider == null || !VerifyPassword(providerVm.Password, provider.Password))
                {
                    throw new Exception("Invalid username or password.");
                }

                return _mapper.Map<ProviderVm>(provider);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in LoginAsync method of ProviderService class: {ex.Message}", ex);
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return enteredPassword == storedPassword;
        }

        private async Task ValidateProvider(Provider provider)
        {
            if (provider == null)
            {
                throw new ArgumentNullException(nameof(provider), "Provider cannot be null.");
            }

            if (await _providerRepository.IsUsernameTakenAsync(provider.Username))
            {
                throw new Exception($"Username '{provider.Username}' is already taken.");
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
