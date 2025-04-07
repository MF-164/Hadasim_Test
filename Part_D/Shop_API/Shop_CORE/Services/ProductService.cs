using AutoMapper;
using Shop_CORE.IServices;
using Shop_CORE.VMs;
using Shop_DATA.IRepositories;
using Shop_DATA.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_CORE.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProviderRepository _providerRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IProviderRepository providerRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _providerRepository = providerRepository;
            _mapper = mapper;
        }

        public async Task<ProductVm> GetProductByIdAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Invalid product ID");
                }
                var product = await _productRepository.GetByIdAsync(id);
                return _mapper.Map<ProductVm>(product);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetProductByIdAsync method of ProductService class in Shop_CORE project: {ex.Message}", ex);
            }
        }

        public async Task<List<ProductVm>> GetProductsByProviderAsync(int providerId)
        {
            try
            {
                if (providerId <= 0)
                {
                    throw new ArgumentException("Invalid provider ID");
                }

                var products = await _productRepository.GetByProviderAsync(providerId);
                return _mapper.Map<List<ProductVm>>(products);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetProductsByProviderAsync method of ProductService class in Shop_CORE project: {ex.Message}", ex);
            }
        }

        public async Task CreateProductAsync(ProductVm productVm)
        {
            try
            {
                var product = _mapper.Map<Product>(productVm);
                await ValidateProduct(product);
                await _productRepository.CreateAsync(product);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateProductAsync method of ProductService class in Shop_CORE project: {ex.Message}", ex);
            }
        }

        private async Task ValidateProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product), "Product cannot be null.");
            }

            if (product.MinQuantity < 0)
            {
                throw new ArgumentException("MinQuantity cannot be less than 0.");
            }

            if (product.Price <= 0)
            {
                throw new ArgumentException("Price must be greater than 0.");
            }

            // Check if Provider exists
            var providerExists = await _providerRepository.GetByIdAsync(product.ProviderId) != null;
            if (!providerExists)
            {
                throw new ArgumentException($"Provider with ID {product.ProviderId} does not exist.");
            }
        }
    }
}
