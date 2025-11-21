namespace BookInventoryManagement.DTOs
{
    public class CreateInventoryDTO
    {
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
