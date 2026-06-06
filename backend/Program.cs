using FlipCardApi.Data;
using FlipCardApi.Repositories;
using FlipCardApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<ICardService, CardService>();
var rawConnection = builder.Configuration.GetConnectionString("DefaultConnection")!;
// Anchor relative SQLite paths to the project directory so the DB file is
// always in the same place regardless of where `dotnet run` is invoked from.
var dbPath = rawConnection.Replace("Data Source=", "").Trim();
var connectionString = Path.IsPathRooted(dbPath)
    ? rawConnection
    : $"Data Source={Path.Combine(builder.Environment.ContentRootPath, dbPath)}";
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite(connectionString));

builder.Services.AddCors(o => o.AddPolicy("React", p =>
    p.WithOrigins("http://localhost:5173")
     .AllowAnyHeader()
     .AllowAnyMethod()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();

app.UseCors("React");
app.MapControllers();
app.Run();
