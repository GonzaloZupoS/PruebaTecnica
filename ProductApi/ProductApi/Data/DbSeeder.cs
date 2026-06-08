using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using ProductApi.Models;

namespace ProductApi.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (await context.Users.AnyAsync(u =>
            u.Email == "gonzalo@test.com" ||
            u.Username == "gonzalo"))
        {
            return;
        }

        var user = new User
        {
            Username = "gonzalo",
            Email = "gonzalo@test.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("1234"),
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            LastLogin = null
        };

        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }
}