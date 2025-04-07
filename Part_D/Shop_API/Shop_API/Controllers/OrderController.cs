using Microsoft.AspNetCore.Mvc;

namespace Shop_API.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
