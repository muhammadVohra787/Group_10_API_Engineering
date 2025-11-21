using BookInventoryManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace BookInventoryManagement.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<BookDetails> BookDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // Configure decimal precision for Book.Price
    modelBuilder.Entity<Book>()
        .Property(b => b.Price)
        .HasColumnType("decimal(18,2)");

    // Configure decimal precision for Inventory.Price
    modelBuilder.Entity<Inventory>()
        .Property(i => i.Price)
        .HasColumnType("decimal(18,2)");
}
    }
    
}
