using Shop_DATA.IRepositories;
using Shop_DATA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop_DATA.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateAsync(Product product)
        {
            try
            {
                var productEntry = await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return productEntry.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateAsync method of ProductRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Products.Include(p => p.Provider).FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetByIdAsync method of ProductRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }

        public async Task<List<Product>> GetByProviderAsync(int providerId)
        {
            try
            {
                return await _context.Products.Where(p => p.ProviderId == providerId).Include(p => p.Provider).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetByProviderAsync method of ProductRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }

        public async Task<List<Product>> GetAllAsync()
        {
            try
            {
                return await _context.Products.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetByProviderAsync method of ProductRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }
    }
}
