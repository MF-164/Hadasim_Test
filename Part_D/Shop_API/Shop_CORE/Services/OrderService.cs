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

        public async Task CreateOrderAsync(OrderVm orderVm)
        {
            try
            {
                var order = _mapper.Map<Order>(orderVm);
                await ValidateOrder(order);
                await _orderRepository.CreateAsync(order);
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
