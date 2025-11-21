using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BookInventoryManagement.DTOs;
using BookInventoryManagement.Models;
using BookInventoryManagement.Repositories;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

[Route("api/[controller]")]
[ApiController]
public class BookDetailsController : ControllerBase
{
    private readonly IBookDetailsRepository _bookDetailsRepository;
    private readonly IMapper _mapper;

    public BookDetailsController(IBookDetailsRepository bookDetailsRepository, IMapper mapper)
    {
        _bookDetailsRepository = bookDetailsRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDetailsDTO>>> GetBookDetails()
    {
        var bookDetails = await _bookDetailsRepository.GetAllBookDetailsAsync();
        return Ok(_mapper.Map<IEnumerable<BookDetailsDTO>>(bookDetails));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDetailsDTO>> GetBookDetail(int id)
    {
        var bookDetail = await _bookDetailsRepository.GetBookDetailsByIdAsync(id);
        if (bookDetail == null) return NotFound();
        return Ok(_mapper.Map<BookDetailsDTO>(bookDetail));
    }

    [HttpGet("book/{bookId}")]
    public async Task<ActionResult<BookDetailsDTO>> GetBookDetailByBookId(int bookId)
    {
        var bookDetail = await _bookDetailsRepository.GetBookDetailsByBookIdAsync(bookId);
        if (bookDetail == null) return NotFound();
        return Ok(_mapper.Map<BookDetailsDTO>(bookDetail));
    }

    [HttpPost]
    public async Task<ActionResult<BookDetailsDTO>> PostBookDetail(CreateBookDetailsDTO createBookDetailDTO)
    {
        var bookDetail = _mapper.Map<BookDetails>(createBookDetailDTO);
        var createdBookDetail = await _bookDetailsRepository.AddBookDetailsAsync(bookDetail);
        return CreatedAtAction(nameof(GetBookDetail), 
            new { id = createdBookDetail.Id }, 
            _mapper.Map<BookDetailsDTO>(createdBookDetail));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBookDetail(int id, UpdateBookDetailsDTO updateBookDetailDTO)
    {
        var existingBookDetail = await _bookDetailsRepository.GetBookDetailsByIdAsync(id);
        if (existingBookDetail == null) return NotFound();

        _mapper.Map(updateBookDetailDTO, existingBookDetail);
        await _bookDetailsRepository.UpdateBookDetailsAsync(existingBookDetail);
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchBookDetail(int id, JsonPatchDocument<BookDetailsPatchDTO> patchDoc)
    {
        var existingBookDetail = await _bookDetailsRepository.GetBookDetailsByIdAsync(id);
        if (existingBookDetail == null) return NotFound();

        var bookDetailsToPatch = _mapper.Map<BookDetailsPatchDTO>(existingBookDetail);
        patchDoc.ApplyTo(bookDetailsToPatch, ModelState);

        if (!TryValidateModel(bookDetailsToPatch))
        {
            return ValidationProblem(ModelState);
        }

        _mapper.Map(bookDetailsToPatch, existingBookDetail);
        await _bookDetailsRepository.UpdateBookDetailsAsync(existingBookDetail);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBookDetail(int id)
    {
        await _bookDetailsRepository.DeleteBookDetailsAsync(id);
        return NoContent();
    }
}