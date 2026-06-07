using FlipCardApi.Models;

namespace FlipCardApi.Services;

public interface ICardService
{
    Task<List<Card>> GetFilteredAsync(
        string? search,
        string? techStack,
        bool? technical,
        bool? behavioural,
        bool? foundation,
        bool? advanced,
        bool? starred
    );
    Task<List<string>> GetTechStacksAsync();
    Task<Card?> GetByIdAsync(int id);
    Task<Card> CreateAsync(Card card);
    Task<Card> UpdateAsync(Card card);
    Task<Card> SetStarredAsync(int id, bool starred);
    Task DeleteAsync(int id);
}
