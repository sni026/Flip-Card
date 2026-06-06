using FlipCardApi.Models;

namespace FlipCardApi.Repositories;

public interface ICardRepository
{
    Task<List<Card>> GetAllAsync();
    Task<Card?> GetByIdAsync(int id);
    Task AddAsync(Card card);
    Task UpdateAsync(Card card);
    Task DeleteAsync(Card card);
    Task SaveChangesAsync();
}
