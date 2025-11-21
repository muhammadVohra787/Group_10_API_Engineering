using AutoMapper;
using BookInventoryManagement.DTOs;
using BookInventoryManagement.Models;

namespace BookInventoryManagement.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // --- Book mappings ---
            CreateMap<Book, BookDTO>();
            CreateMap<CreateBookDTO, Book>();
            CreateMap<UpdateBookDTO, Book>();

            // --- BookDetails mappings ---
            CreateMap<BookDetails, BookDetailsDTO>();              // Entity -> DTO (for GETs)

            CreateMap<CreateBookDetailsDTO, BookDetails>();        // POST
            CreateMap<UpdateBookDetailsDTO, BookDetails>();        // PUT

            // PATCH (entity <-> patch dto)
            CreateMap<BookDetails, BookDetailsPatchDTO>().ReverseMap();
        }
    }
}
