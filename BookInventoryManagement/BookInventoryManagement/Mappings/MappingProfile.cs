using AutoMapper;
using BookInventoryManagement.DTOs;
using BookInventoryManagement.Models;

namespace BookInventoryManagement.Mappings
{
    public class BookDetailsProfile : Profile
    {
        public BookDetailsProfile()
        {
CreateMap<BookDetails, BookDetailsDTO>();
CreateMap<CreateBookDetailsDTO, BookDetails>();
CreateMap<UpdateBookDetailsDTO, BookDetails>();
CreateMap<BookDetails, UpdateBookDetailsDTO>();
CreateMap<BookDetails, BookDetailsPatchDTO>().ReverseMap();
        }
    }
}
