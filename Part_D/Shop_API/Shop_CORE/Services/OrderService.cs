using AutoMapper;
using Shop_CORE.IServices;
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
        private readonly IProductRepository _productRepository; // Assuming you have a product repository to get product details
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository,IMapper mapper)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
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

        private async Task ValidateOrder(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            if (order.Quantity <= 0)
            {
                throw new ArgumentException("TotalAmount חייב להיות גדול מ-0.", nameof(order.Quantity));
            }

            if (order.ProductId <= 0)
            {
                throw new ArgumentException("ProductId חייב להיות תקין.", nameof(order.ProductId));
            }

            if (order.ProviderId <= 0)
            {
                throw new ArgumentException("ProviderId חייב להיות תקין.", nameof(order.ProviderId));
            }

            var product = await _productRepository.GetByIdAsync(order.ProductId);
            if (product == null)
            {
                throw new ArgumentException("המוצר עם ה-ID שניתן לא קיים.", nameof(order.ProductId));
            }

            if (product.ProviderId != order.ProviderId)
            {
                throw new ArgumentException("ProviderId אינו תואם לספק של המוצר.", nameof(order.ProviderId));
            }

            if (order.Quantity < product.MinQuantity)
            {
                throw new ArgumentException($"הכמות המוזמנת חייבת להיות לפחות {product.MinQuantity}.", nameof(order.Quantity));
            }
        }

    }
}
