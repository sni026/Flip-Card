using FlipCardApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FlipCardApi.Data;

//DbContextOptions<AppDbContext> -> Options for AppDbContext
//CardsController inherits from ControllerBase.
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    //Entity Framework uses this property to map the Card entity to a database table
    public DbSet<Card> Cards { get; set; }
}
