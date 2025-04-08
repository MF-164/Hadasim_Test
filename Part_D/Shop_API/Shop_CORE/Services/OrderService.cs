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
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<OrderVm> CreateOrderAsync(OrderVm orderVm)
        {
            try
            {
                var order = _mapper.Map<Order>(orderVm);
                await ValidateOrder(order);
                var createdOrder = await _orderRepository.CreateAsync(order);

                return _mapper.Map<OrderVm>(createdOrder);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in CreateOrderAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }

        public async Task<List<OrderVm>> GetAllOrdersAsync()
        {
            try
            {
                var orders = await _orderRepository.GetAllAsync();
                return _mapper.Map<List<OrderVm>>(orders);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetAllOrdersAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }

        public async Task<List<OrderVm>> GetByProviderIdAsync(int providerId)
        {
            try
            {
                if (providerId <= 0)
                {
                    throw new ArgumentException("Invalid provider ID");
                }

                var orders = await _orderRepository.GetByProviderIdAsync(providerId);
                if (orders == null || !orders.Any())
                {
                    throw new KeyNotFoundException("No orders found for the specified provider.");
                }

                return _mapper.Map<List<OrderVm>>(orders);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetByProviderIdAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }


        public async Task<OrderVm> GetOrderByIdAsync(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentException("Invalid order ID");
                }

                var order = await _orderRepository.GetByIdAsync(id);
                return _mapper.Map<OrderVm>(order);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in GetOrderByIdAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }

        public async Task<OrderVm> UpdateOrderStatusAsync(int orderId, string newStatus)
        {
            try
            {
                if (orderId <= 0)
                {
                    throw new ArgumentException("Invalid order ID");
                }

                var updatedOrder = await _orderRepository.UpdateStatusAsync(orderId, newStatus);

                return _mapper.Map<OrderVm>(updatedOrder);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in UpdateOrderStatusAsync method, Class: OrderService. Original error: {ex.Message}", ex);
            }
        }


        private async Task ValidateOrder(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            if (order.Quantity <= 0)
            {
                throw new ArgumentException("TotalAmount must be greater than 0.", nameof(order.Quantity));
            }

            if (order.ProductId <= 0)
            {
                throw new ArgumentException("ProductId must be valid.", nameof(order.ProductId));
            }

            if (order.ProviderId <= 0)
            {
                throw new ArgumentException("ProviderId must be valid.", nameof(order.ProviderId));
            }

            var product = await _productRepository.GetByIdAsync(order.ProductId);
            if (product == null)
            {
                throw new ArgumentException("The product with the given ID does not exist.", nameof(order.ProductId));
            }

            if (product.ProviderId != order.ProviderId)
            {
                throw new ArgumentException("ProviderId does not match the product's supplier.", nameof(order.ProviderId));
            }

            if (order.Quantity < product.MinQuantity)
            {
                throw new ArgumentException($"The ordered quantity must be at least {product.MinQuantity}.", nameof(order.Quantity));
            }
        }
    }
}
