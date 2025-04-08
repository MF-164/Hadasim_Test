using Microsoft.AspNetCore.Mvc;
using Shop_CORE.IServices;
using Shop_CORE.Services;
using Shop_CORE.VMs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetProductById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }
            return Ok(product);
        }

        [HttpGet("GetProductsByProvider/{providerId}")]
        public async Task<IActionResult> GetProductsByProvider(int providerId)
        {
            var products = await _productService.GetProductsByProviderAsync(providerId);
            return Ok(products);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpPost("CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductVm productVm)
        {
            if (productVm == null)
            {
                return BadRequest("Product cannot be null.");
            }

            var createdProduct = await _productService.CreateProductAsync(productVm);
            return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
        }
    }
}
