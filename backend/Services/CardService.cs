using FlipCardApi.Models;
using FlipCardApi.Repositories;
using Microsoft.Extensions.Caching.Memory;

namespace FlipCardApi.Services;

public class CardService(ICardRepository repository, IMemoryCache cache) : ICardService
{
    private const string CardsKey = "all_cards";
    private const string StacksKey = "all_stacks";
    private static readonly MemoryCacheEntryOptions CacheOptions =
        new() { SlidingExpiration = TimeSpan.FromMinutes(10) };

    private Task<List<Card>> GetCachedCardsAsync() =>
        cache.GetOrCreateAsync<List<Card>>(CardsKey, entry =>
        {
            entry.SlidingExpiration = TimeSpan.FromMinutes(10);
            return repository.GetAllAsync();
        })!;

    private void SetCache(List<Card> cards)
    {
        cache.Set(CardsKey, cards, CacheOptions);

        var stacks = cards
            .Where(c => !string.IsNullOrEmpty(c.TechStack))
            .Select(c => c.TechStack)
            .Distinct()
            .OrderBy(t => t)
            .ToList();

        cache.Set(StacksKey, stacks, CacheOptions);
    }

    public async Task<List<Card>> GetFilteredAsync(
        string? search,
        string? techStack,
        bool? technical,
        bool? behavioural,
        bool? foundation,
        bool? advanced,
        bool? starred)
    {
        var cards = (await GetCachedCardsAsync()).AsEnumerable();

        if (!string.IsNullOrWhiteSpace(search))
            cards = cards.Where(c => c.Question.Contains(search, StringComparison.OrdinalIgnoreCase)
                                  || c.Answer.Contains(search, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrWhiteSpace(techStack))
            cards = cards.Where(c => c.TechStack == techStack);

        if (technical == true)   cards = cards.Where(c => c.Technical);
        if (behavioural == true) cards = cards.Where(c => c.Behavioural);
        if (foundation == true)  cards = cards.Where(c => c.Foundation);
        if (advanced == true)    cards = cards.Where(c => !c.Foundation);
        if (starred == true)     cards = cards.Where(c => c.Starred);

        return cards.ToList();
    }

    public Task<List<string>> GetTechStacksAsync() =>
        cache.GetOrCreateAsync<List<string>>(StacksKey, async entry =>
        {
            entry.SlidingExpiration = TimeSpan.FromMinutes(10);
            return (await GetCachedCardsAsync())
                .Where(c => !string.IsNullOrEmpty(c.TechStack))
                .Select(c => c.TechStack)
                .Distinct()
                .OrderBy(t => t)
                .ToList();
        })!;

    public Task<Card?> GetByIdAsync(int id) =>
        repository.GetByIdAsync(id);

    public async Task<Card> CreateAsync(Card card)
    {
        await repository.AddAsync(card);
        await repository.SaveChangesAsync();

        var cards = await GetCachedCardsAsync();
        cards.Add(card);
        SetCache(cards);

        return card;
    }

    public async Task<Card> UpdateAsync(Card card)
    {
        await repository.UpdateAsync(card);
        await repository.SaveChangesAsync();

        var cards = await GetCachedCardsAsync();
        var index = cards.FindIndex(c => c.Id == card.Id);
        if (index >= 0)
            cards[index] = card;

        SetCache(cards);
        return card;
    }

    public async Task<Card> SetStarredAsync(int id, bool starred)
    {
        var card = await repository.GetByIdAsync(id);
        if (card is null)
            throw new KeyNotFoundException();

        card.Starred = starred;
        await repository.SaveChangesAsync();

        var cards = await GetCachedCardsAsync();
        var cachedCard = cards.FirstOrDefault(c => c.Id == id);
        if (cachedCard is not null)
            cachedCard.Starred = starred;

        SetCache(cards);
        return card;
    }

    public async Task DeleteAsync(int id)
    {
        var card = await repository.GetByIdAsync(id);
        if (card is null)
            throw new KeyNotFoundException();

        await repository.DeleteAsync(card);
        await repository.SaveChangesAsync();

        var cards = await GetCachedCardsAsync();
        cards.RemoveAll(c => c.Id == id);
        SetCache(cards);
    }
}
