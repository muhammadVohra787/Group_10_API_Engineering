using Microsoft.EntityFrameworkCore;
using BookInventoryManagement.Data;
using BookInventoryManagement.Models;

namespace BookInventoryManagement.Repositories
{
    public class BookDetailsRepository : IBookDetailsRepository
    {
        private readonly ApplicationDbContext _context;

        public BookDetailsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookDetails>> GetAllBookDetailsAsync()
        {
            return await _context.BookDetails
                .Include(bd => bd.Book)
                .ToListAsync();
        }

        public async Task<BookDetails> GetBookDetailsByIdAsync(int id)
        {
            return await _context.BookDetails
                .Include(bd => bd.Book)
                .FirstOrDefaultAsync(bd => bd.Id == id);
        }

        public async Task<BookDetails> GetBookDetailsByBookIdAsync(int bookId)
        {
            return await _context.BookDetails
                .Include(bd => bd.Book)
                .FirstOrDefaultAsync(bd => bd.BookId == bookId);
        }

        public async Task<BookDetails> AddBookDetailsAsync(BookDetails bookDetails)
        {
            bookDetails.CreatedAt = DateTime.UtcNow;
            bookDetails.UpdatedAt = DateTime.UtcNow;
            
            _context.BookDetails.Add(bookDetails);
            await _context.SaveChangesAsync();
            return bookDetails;
        }

        public async Task<BookDetails> UpdateBookDetailsAsync(BookDetails bookDetails)
        {
            bookDetails.UpdatedAt = DateTime.UtcNow;
            _context.Entry(bookDetails).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return bookDetails;
        }

        public async Task DeleteBookDetailsAsync(int id)
        {
            var bookDetails = await _context.BookDetails.FindAsync(id);
            if (bookDetails != null)
            {
                _context.BookDetails.Remove(bookDetails);
                await _context.SaveChangesAsync();
            }
        }
    }
}