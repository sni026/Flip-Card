using FlipCardApi.Data;
using FlipCardApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FlipCardApi.Repositories;

public class CardRepository : ICardRepository
{
    private readonly AppDbContext db;

    public CardRepository(AppDbContext db)
    {
        this.db = db;
    }

    public Task<List<Card>> GetAllAsync() =>
        db.Cards.OrderBy(c => c.Id).ToListAsync();

    public Task<Card?> GetByIdAsync(int id) =>
        db.Cards.FindAsync(id).AsTask();

    public Task AddAsync(Card card)
    {
        db.Cards.Add(card);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Card card)
    {
        db.Cards.Update(card);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Card card)
    {
        db.Cards.Remove(card);
        return Task.CompletedTask;
    }

    public Task SaveChangesAsync() =>
        db.SaveChangesAsync();
}
