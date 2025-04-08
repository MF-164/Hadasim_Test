using Microsoft.AspNetCore.Mvc;
using Shop_CORE.IServices;
using Shop_CORE.VMs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderVm orderVm)
        {
            if (orderVm == null)
            {
                return BadRequest("Order cannot be null.");
            }

            var createdOrder = await _orderService.CreateOrderAsync(orderVm);
            return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, createdOrder);
        }


        [HttpPut("UpdateStatusByOrderId/{orderId}")]
        public async Task<ActionResult<OrderVm>> UpdateOrderStatus(int orderId, [FromBody] string newStatus)
        {
            try
            {
                var updatedOrder = await _orderService.UpdateOrderStatusAsync(orderId, newStatus);
                return Ok(updatedOrder);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating order status: {ex.Message}");
            }
        }


        [HttpGet("GetOrdersByProviderId/{providerId}")]
        public async Task<IActionResult> GetByProviderIdAsync(int providerId)
        {
            try
            {
                var orders = await _orderService.GetByProviderIdAsync(providerId);
                return Ok(orders);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("GetOrderById/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound($"Order with ID {id} not found.");
            }
            return Ok(order);
        }
    }
}
