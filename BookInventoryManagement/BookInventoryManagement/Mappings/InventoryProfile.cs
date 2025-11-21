using AutoMapper;
using BookInventoryManagement.DTOs;
using BookInventoryManagement.Models;

namespace BookInventoryManagement.Mappings
{
    public class InventoryProfile : Profile
    {
        public InventoryProfile()
        {
            CreateMap<Inventory, InventoryDTO>().ReverseMap();
            CreateMap<CreateInventoryDTO, Inventory>().ReverseMap();
            CreateMap<UpdateInventoryDTO, Inventory>().ReverseMap();
        }
    }
}
