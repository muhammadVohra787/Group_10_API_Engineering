namespace BookInventoryManagement.DTOs
{
    public class InventoryDTO
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
