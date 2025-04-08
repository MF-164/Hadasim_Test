using Microsoft.AspNetCore.Mvc;
using Shop_CORE.IServices;
using Shop_CORE.VMs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        private readonly IProviderService _providerService;

        public ProviderController(IProviderService providerService)
        {
            _providerService = providerService;
        }


        [HttpPost("CreateProvider")]
        public async Task<IActionResult> CreateProvider([FromBody] ProviderVm providerVm)
        {
            if (providerVm == null)
            {
                return BadRequest("Provider cannot be null.");
            }

            var createdProvider = await _providerService.CreateProviderAsync(providerVm);
            return CreatedAtAction(nameof(GetProviderById), new { id = createdProvider.Id }, createdProvider);
        }

        [HttpGet("GetProviderById/{id}")]
        public async Task<IActionResult> GetProviderById(int id)
        {
            var providerVm = await _providerService.GetProviderByIdAsync(id);
            if (providerVm == null)
            {
                return NotFound($"Provider with ID {id} not found.");
            }
            return Ok(providerVm);
        }

        [HttpGet("GetAllProviders")]
        public async Task<IActionResult> GetAllProviders()
        {
            var providers = await _providerService.GetAllProvidersAsync();
            return Ok(providers);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginProvider([FromBody] ProviderVm providerVm)
        {
            if (providerVm == null)
            {
                return BadRequest("Login data cannot be null.");
            }

            var provider = await _providerService.LoginAsync(providerVm);
            if (provider == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(provider);
        }
    }
}
