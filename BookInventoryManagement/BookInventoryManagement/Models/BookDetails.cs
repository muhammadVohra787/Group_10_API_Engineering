using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookInventoryManagement.Models
{
    public class BookDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Book")]
        public int BookId { get; set; }

        [StringLength(100)]
        public string Genre { get; set; }

        [StringLength(50)]
        public string Language { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int PageCount { get; set; }

        [Required]
        [StringLength(20)]
        public string Format { get; set; }   // Hardcover, Paperback, eBook

        [Url]
        [StringLength(500)]
        public string CoverImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        // Navigation Property to Book
        public Book Book { get; set; }
    }
}