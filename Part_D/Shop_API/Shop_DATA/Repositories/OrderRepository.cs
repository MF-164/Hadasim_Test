using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop_DATA.IRepositories;
using Shop_DATA.Models;

public class OrderRepository : IOrderRepository
{
    private readonly ApplicationDbContext _context;

    public OrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Order order)
    {
        try
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"Error in CreateAsync method, Class: OrderRepository, Project: Shop_DATA. Original error: {ex.Message}", ex);
        }
    }

    public async Task<Order> GetByIdAsync(int id)
    {
        try
        {
            var order = await _context.Orders
                .Include(o => o.Provider)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }
            return order;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error in GetByIdAsync method, Class: OrderRepository, Project: Shop_DATA. Original error: {ex.Message}", ex);
        }
    }

    public async Task<List<Order>> GetAllAsync()
    {
        try
        {
            return await _context.Orders.Include(o => o.Provider).ToListAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"Error in GetAllAsync method, Class: OrderRepository, Project: Shop_DATA. Original error: {ex.Message}", ex);
        }
    }
}
