using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace BookInventoryManagement.DTOs
{
    public class BookDetailsPatchDTO
    {
        [StringLength(100)]
        [JsonPropertyName("genre")]
        public string Genre { get; set; }
        
        [StringLength(50)]
        [JsonPropertyName("language")]
        public string Language { get; set; }
        
        [Range(1, int.MaxValue)]
        [JsonPropertyName("pageCount")]
        public int? PageCount { get; set; }
        
        [StringLength(20)]
        [JsonPropertyName("format")]
        public string Format { get; set; }
        
        [Url]
        [StringLength(500)]
        [JsonPropertyName("coverImageUrl")]
        public string CoverImageUrl { get; set; }
    }
}