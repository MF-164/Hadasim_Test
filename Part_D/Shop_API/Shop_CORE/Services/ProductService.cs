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

        public ProductService(IProductRepository productRepository, IProviderRepository providerRepository)
        {
            _productRepository = productRepository;
            _providerRepository = providerRepository; 
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Invalid product ID");
                }
                return await _productRepository.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetProductByIdAsync method of ProductService class in Shop_CORE project: {ex.Message}", ex);
            }
        }

        public async Task<List<Product>> GetProductsByProviderAsync(int providerId)
        {
            try
            {
                if (providerId <= 0) {
                    throw new ArgumentException("Invalid provider ID");
                }

                return await _productRepository.GetByProviderAsync(providerId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetProductsByProviderAsync method of ProductService class in Shop_CORE project: {ex.Message}", ex);
            }
        }

        public async Task CreateProductAsync(Product product)
        {
            try
            {
                ValidateProduct(product);
                await _productRepository.CreateAsync(product);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateProductAsync method of ProductService class in Shop_CORE project: {ex.Message}", ex);
            }
        }

        public async Task ValidateProduct(Product product)
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

            //Check if Provider exist
            var providerExists = await _providerRepository.GetByIdAsync(product.ProviderId) != null;
            if (!providerExists)
            {
                throw new ArgumentException($"Provider with ID {product.ProviderId} does not exist.");
            }
        }
    }
}
