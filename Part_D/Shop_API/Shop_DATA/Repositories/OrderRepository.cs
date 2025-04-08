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

    public async Task<Order> CreateAsync(Order order)
    {
        try
        {
            var orderEntity = await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return orderEntity.Entity;
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

    public async Task<List<Order>> GetByProviderIdAsync(int providerId)
    {
        try
        {
            var orders = await _context.Orders
                .Include(o => o.Provider)
                .Where(o => o.ProviderId == providerId)
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                throw new KeyNotFoundException("No orders found for the specified provider.");
            }
            return orders;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error in GetByProviderIdAsync method, Class: OrderRepository, Project: Shop_DATA. Original error: {ex.Message}", ex);
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

    public async Task<Order> UpdateStatusAsync(int orderId, string newStatus)
    {
        try
        {
            var order = await _context.Orders.FindAsync(orderId);

            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }

            order.Status = newStatus; 
            await _context.SaveChangesAsync();

            return order;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error in UpdateStatusAsync method, Class: OrderRepository, Project: Shop_DATA. Original error: {ex.Message}", ex);
        }
    }

}
