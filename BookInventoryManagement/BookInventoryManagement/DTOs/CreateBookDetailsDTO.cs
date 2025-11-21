using System.ComponentModel.DataAnnotations;

namespace BookInventoryManagement.DTOs
{
    public class CreateBookDetailsDTO
    {
        [Required]
        public int BookId { get; set; }

        [StringLength(100)]
        public string Genre { get; set; }

        [StringLength(50)]
        public string Language { get; set; }

        [Required]                               // ✅ add
        [Range(1, int.MaxValue)]
        public int PageCount { get; set; }

        [Required]                               // ✅ add
        [StringLength(20)]
        public string Format { get; set; }

        [Url]
        [StringLength(500)]
        public string CoverImageUrl { get; set; }
    }
}
