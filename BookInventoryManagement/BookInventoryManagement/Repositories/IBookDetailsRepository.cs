using BookInventoryManagement.Models;

namespace BookInventoryManagement.Repositories
{
    public interface IBookDetailsRepository
    {
        Task<IEnumerable<BookDetails>> GetAllBookDetailsAsync();
        Task<BookDetails> GetBookDetailsByIdAsync(int id);
        Task<BookDetails> GetBookDetailsByBookIdAsync(int bookId);
        Task<BookDetails> AddBookDetailsAsync(BookDetails bookDetails);
        Task<BookDetails> UpdateBookDetailsAsync(BookDetails bookDetails);
        Task DeleteBookDetailsAsync(int id);
    }
}