using FlipCardApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FlipCardApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Card> Cards { get; set; }
}
