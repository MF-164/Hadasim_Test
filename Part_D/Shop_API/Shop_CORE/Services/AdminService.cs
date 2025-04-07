using Shop_DATA.Models;

namespace Shop_CORE.Services
{
    public class AdminService : IAdminService
    {
        private readonly Admin _admin;

        public AdminService()
        {
            _admin = new Admin();
        }

        public bool ValidateCredentials(string name, string password)
        {
            return _admin.Name.Equals(name, StringComparison.OrdinalIgnoreCase) &&
                   _admin.Password == password;
        }

        public string GetAdminName()
        {
            return _admin.Name;
        }
    }
}
