using Microsoft.AspNetCore.Mvc;

namespace Shop_API.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
