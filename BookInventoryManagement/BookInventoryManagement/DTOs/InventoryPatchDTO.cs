namespace BookInventoryManagement.DTOs
{
    public class InventoryPatchDTO
    {
        public int? Quantity { get; set; } // Nullable to allow partial updates
        public decimal? Price { get; set; } // Nullable to allow partial updates
    }
}
