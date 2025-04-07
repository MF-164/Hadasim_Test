namespace Shop_CORE.Services
{
    public interface IAdminService
    {
        bool ValidateCredentials(string name, string password);
        string GetAdminName();
    }
}
