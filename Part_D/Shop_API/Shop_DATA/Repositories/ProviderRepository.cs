using Shop_DATA.IRepositories;
using Shop_DATA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop_DATA.Repositories
{
    public class ProviderRepository : IProviderRepository
    {
        private readonly ApplicationDbContext _context;

        public ProviderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Provider> CreateAsync(Provider provider)
        {
            try
            {
                var providerEntity = await _context.Providers.AddAsync(provider);
                await _context.SaveChangesAsync();
                return providerEntity.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateAsync method of ProviderRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }

        public async Task<bool> IsUsernameTakenAsync(string username)
        {
            try
            {
                return await _context.Providers.AnyAsync(p => p.Username == username);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in IsUsernameTakenAsync method of ProviderRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }

        public async Task<Provider> GetByUsernameAsync(string username)
        {
            try
            {
                return await _context.Providers.FirstOrDefaultAsync(p => p.Username == username);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetByUsernameAsync method of ProviderRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }


        public async Task<List<Provider>> GetAllAsync()
        {
            try
            {
                return await _context.Providers.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetAllAsync method of ProviderRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }

        public async Task<Provider> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Providers.Include(p => p.Products).Include(p => p.Orders).FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetByIdAsync method of ProviderRepository class in Shop_DATA project: {ex.Message}", ex);
            }
        }
    }
}
