using AutoMapper;
using Shop_CORE.VMs;
using Shop_DATA.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Provider, ProviderVm>();
        CreateMap<ProviderVm, Provider>();

        CreateMap<Product, ProductVm>()
            .ForMember(dest => dest.ProviderName, opt => opt.MapFrom(src => src.Provider.CompanyName));
        CreateMap<ProductVm, Product>();

        CreateMap<Order, OrderVm>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.ProviderName, opt => opt.MapFrom(src => src.Product.Provider.CompanyName));
        CreateMap<OrderVm, Order>();
    }
}
// Compare this snippet from Shop_DATA/Models: