using System.ComponentModel.DataAnnotations;

public class ProductCreateDto
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor a 0")]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo")]
    public int Stock { get; set; }
}