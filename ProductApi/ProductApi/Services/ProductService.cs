using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.DTOs;
using ProductApi.Models;

namespace ProductApi.Services;

public class ProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    // ======================
    // MAPPER CENTRAL
    // ======================
    private static ProductResponseDto MapToDto(Product p)
    {
        return new ProductResponseDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock
        };
    }

    // ======================
    // GET ALL
    // ======================
    public async Task<List<ProductResponseDto>> GetAllAsync()
    {
        return await _context.Products
            .Select(p => MapToDto(p))
            .ToListAsync();
    }

    // ======================
    // GET BY ID
    // ======================
    public async Task<ProductResponseDto?> GetByIdAsync(int id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        return product == null ? null : MapToDto(product);
    }

    // ======================
    // CREATE 
    // ======================
    public async Task<ProductResponseDto> CreateAsync(ProductCreateDto dto)
    {
        if (dto.Price <= 0)
            throw new ArgumentException("El precio debe ser mayor a 0");

        if (dto.Stock < 0)
            throw new ArgumentException("El stock no puede ser negativo");

        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return MapToDto(product);
    }

    // ======================
    // UPDATE
    // ======================
    public async Task<bool> UpdateAsync(int id, ProductUpdateDto dto)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return false;

        if (dto.Price <= 0)
            throw new ArgumentException("El precio debe ser mayor a 0");

        if (dto.Stock < 0)
            throw new ArgumentException("El stock no puede ser negativo");

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Stock = dto.Stock;

        await _context.SaveChangesAsync();

        return true;
    }

    // ======================
    // DELETE (hard delete)
    // ======================
    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return true;
    }
}