using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductApi.Data;
using ProductApi.DTOs;
using ProductApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace ProductApi.Services;

public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(ApplicationDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<string?> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u =>
                (u.Username == dto.UsernameOrEmail || u.Email == dto.UsernameOrEmail)
                && u.IsActive);

        if (user == null)
            return null;

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return null;

        user.LastLogin = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return GenerateToken(user);
    }

    private string GenerateToken(User user)
    {
        var jwt = _config.GetSection("Jwt");

        var key = jwt["Key"]
            ?? throw new Exception("JWT Key missing");

        var issuer = jwt["Issuer"]
            ?? throw new Exception("JWT Issuer missing");

        var audience = jwt["Audience"]
            ?? throw new Exception("JWT Audience missing");

        var expireMinutesString = jwt["ExpireMinutes"]
            ?? throw new Exception("JWT ExpireMinutes missing");

        if (!double.TryParse(expireMinutesString, out var expireMinutes))
            throw new Exception("JWT ExpireMinutes is not a valid number");

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(key));

        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}