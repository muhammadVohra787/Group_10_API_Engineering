using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookInventoryManagement.Repositories;
using BookInventoryManagement.Models;
using AutoMapper;
using BookInventoryManagement.DTOs;
using Microsoft.AspNetCore.JsonPatch;

namespace BookInventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BooksController(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [HttpGet]
     
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetAllBooks()
        {
            var books = await _bookRepository.GetAllBooksAsync();
            var bookDTOs = _mapper.Map<IEnumerable<BookDTO>>(books);
            return Ok(bookDTOs);
        }

        [HttpGet("{id}")]
     
        public async Task<ActionResult<BookDTO>> GetBookById(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            var bookDTO = _mapper.Map<BookDTO>(book);
            return Ok(bookDTO);
        }

        [HttpPost]
       
        public async Task<ActionResult<BookDTO>> CreateBook(CreateBookDTO createBookDTO)
        {
            var book = _mapper.Map<Book>(createBookDTO);
            await _bookRepository.AddBookAsync(book);
            var bookDTO = _mapper.Map<BookDTO>(book);
            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, bookDTO);
        }

        [HttpPut("{id}")]
      
        public async Task<IActionResult> UpdateBook(int id, UpdateBookDTO updateBookDTO)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _mapper.Map(updateBookDTO, book);
            await _bookRepository.UpdateBookAsync(book);
            return NoContent();
        }


        // PATCH: api/Book/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchBook(int id, [FromBody] JsonPatchDocument<BookPatchDTO> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Invalid patch document.");
            }

            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }

            var bookPatchDTO = new BookPatchDTO
            {
                Title = book.Title,
                Author = book.Author,
                ISBN = book.ISBN,
                Price = book.Price
            };

            patchDoc.ApplyTo(bookPatchDTO, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            book.Title = bookPatchDTO.Title ?? book.Title;
            book.Author = bookPatchDTO.Author ?? book.Author;
            book.ISBN = bookPatchDTO.ISBN ?? book.ISBN;
            book.Price = bookPatchDTO.Price ?? book.Price;
           
            await _bookRepository.UpdateBookAsync(book);

            return NoContent();
        }
        [HttpDelete("{id}")]
        
        public async Task<IActionResult> DeleteBook(int id)
        {
            await _bookRepository.DeleteBookAsync(id);
            return NoContent();
        }
    }
}
