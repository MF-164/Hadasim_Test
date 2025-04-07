using Microsoft.AspNetCore.Mvc;

namespace Shop_API.Controllers
{
    public class ProviderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
