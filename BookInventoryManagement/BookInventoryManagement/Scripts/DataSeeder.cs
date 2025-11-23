using BookInventoryManagement.Data;
using BookInventoryManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace BookInventoryManagement.Scripts
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // ---------- BOOKS ----------
            var bookList = new List<Book>
            {
                new Book { Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", ISBN = "9780743273565", Price = 12.99m },
                new Book { Title = "To Kill a Mockingbird", Author = "Harper Lee", ISBN = "9780061120084", Price = 14.99m },
                new Book { Title = "1984", Author = "George Orwell", ISBN = "9780451524935", Price = 13.50m },
                new Book { Title = "Pride and Prejudice", Author = "Jane Austen", ISBN = "9781503290563", Price = 11.99m },
                new Book { Title = "The Catcher in the Rye", Author = "J.D. Salinger", ISBN = "9780316769488", Price = 10.99m },
                new Book { Title = "The Hobbit", Author = "J.R.R. Tolkien", ISBN = "9780547928227", Price = 15.50m },
                new Book { Title = "Fahrenheit 451", Author = "Ray Bradbury", ISBN = "9781451673319", Price = 12.50m },
                new Book { Title = "Moby Dick", Author = "Herman Melville", ISBN = "9781503280786", Price = 13.99m },
                new Book { Title = "Jane Eyre", Author = "Charlotte Bronte", ISBN = "9780141441146", Price = 11.50m },
                new Book { Title = "The Odyssey", Author = "Homer", ISBN = "9780140268867", Price = 14.00m },
            };

            foreach (var b in bookList)
            {
                if (!await context.Books.AnyAsync(x => x.ISBN == b.ISBN))
                    context.Books.Add(b);
            }

            await context.SaveChangesAsync(); // Save so we get BookIds



            // ---------- BOOK DETAILS ----------
            var detailsList = new List<BookDetails>
            {
                new BookDetails { BookId = GetId("9780743273565"), Genre = "Classic", Language = "English", PageCount = 180, Format = "Paperback", CoverImageUrl = "https://example.com/gatsby.jpg" },
                new BookDetails { BookId = GetId("9780061120084"), Genre = "Fiction", PageCount = 281, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/mockingbird.jpg" },
                new BookDetails { BookId = GetId("9780451524935"), Genre = "Dystopian", PageCount = 328, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/1984.jpg" },
                new BookDetails { BookId = GetId("9781503290563"), Genre = "Romance", PageCount = 279, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/pride.jpg" },
                new BookDetails { BookId = GetId("9780316769488"), Genre = "Classic", PageCount = 214, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/catcher.jpg" },
                new BookDetails { BookId = GetId("9780547928227"), Genre = "Fantasy", PageCount = 310, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/hobbit.jpg" },
                new BookDetails { BookId = GetId("9781451673319"), Genre = "Science Fiction", PageCount = 158, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/fahrenheit.jpg" },
                new BookDetails { BookId = GetId("9781503280786"), Genre = "Adventure", PageCount = 635, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/mobydick.jpg" },
                new BookDetails { BookId = GetId("9780141441146"), Genre = "Gothic", PageCount = 500, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/janeeyre.jpg" },
                new BookDetails { BookId = GetId("9780140268867"), Genre = "Epic", PageCount = 560, Language = "English", Format = "Paperback", CoverImageUrl = "https://example.com/odyssey.jpg" },
            };

            foreach (var d in detailsList)
            {
                if (!await context.BookDetails.AnyAsync(x => x.BookId == d.BookId))
                {
                    d.CreatedAt = DateTime.UtcNow;
                    d.UpdatedAt = DateTime.UtcNow;
                    context.BookDetails.Add(d);
                }
            }

            await context.SaveChangesAsync();



            // ---------- INVENTORY ----------
            var inventoryList = new List<Inventory>
            {
                new Inventory { BookId = GetId("9780743273565"), Quantity = 15, Price = 12.99m },
                new Inventory { BookId = GetId("9780061120084"), Quantity = 20, Price = 14.99m },
                new Inventory { BookId = GetId("9780451524935"), Quantity = 25, Price = 13.50m },
                new Inventory { BookId = GetId("9781503290563"), Quantity = 10, Price = 11.99m },
                new Inventory { BookId = GetId("9780316769488"), Quantity = 12, Price = 10.99m },
                new Inventory { BookId = GetId("9780547928227"), Quantity = 18, Price = 15.50m },
                new Inventory { BookId = GetId("9781451673319"), Quantity = 22, Price = 12.50m },
                new Inventory { BookId = GetId("9781503280786"), Quantity = 8, Price = 13.99m },
                new Inventory { BookId = GetId("9780141441146"), Quantity = 14, Price = 11.50m },
                new Inventory { BookId = GetId("9780140268867"), Quantity = 16, Price = 14.00m },
            };

            foreach (var inv in inventoryList)
            {
                if (!await context.Inventories.AnyAsync(x => x.BookId == inv.BookId))
                    context.Inventories.Add(inv);
            }

            await context.SaveChangesAsync();



            // Helper function to fetch BookId by ISBN
            int GetId(string isbn)
                => context.Books.First(b => b.ISBN == isbn).Id;
        }
    }
}
