namespace BookInventoryManagement.DTOs
{
    public class BookDetailsDTO
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public int PageCount { get; set; }
        public string Format { get; set; }
        public string CoverImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}