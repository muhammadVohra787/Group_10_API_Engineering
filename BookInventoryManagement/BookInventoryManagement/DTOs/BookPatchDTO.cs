namespace BookInventoryManagement.DTOs
{
    public class BookPatchDTO
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public decimal? Price { get; set; }// Nullable to allow partial updates
    }
}
