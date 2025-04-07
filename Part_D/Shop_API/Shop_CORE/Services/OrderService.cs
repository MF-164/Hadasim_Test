using AutoMapper;
using Shop_CORE.IServices;
using Shop_CORE.VMs;
using Shop_DATA.IRepositories;
using Shop_DATA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop_CORE.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task CreateOrderAsync(Order order)
        {
            try
            {
                ValidateOrder(order);
                await _orderRepository.CreateAsync(order);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateOrderAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }

        public async Task<List<Order>> GetAllOrdersAsync()
        {
            try
            {
                return await _orderRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetAllOrdersAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Invalid order ID");
                }

                return await _orderRepository.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetOrderByIdAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }

        private void ValidateOrder(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            // הוסף כאן בדיקות נוספות לפי הצורך
        }
    }
}
