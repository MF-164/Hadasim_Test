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

            await _orderService.CreateOrderAsync(orderVm);
            return CreatedAtAction(nameof(GetOrderById), new { id = orderVm.Id }, orderVm);
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
