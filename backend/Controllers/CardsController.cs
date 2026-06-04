using FlipCardApi.Data;
using FlipCardApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlipCardApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? techStack,
        [FromQuery] bool? technical,
        [FromQuery] bool? behavioural)
    {
        var query = db.Cards.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c => c.Question.Contains(search) || c.Answer.Contains(search));

        if (!string.IsNullOrWhiteSpace(techStack))
            query = query.Where(c => c.TechStack == techStack);

        if (technical == true)
            query = query.Where(c => c.Technical);

        if (behavioural == true)
            query = query.Where(c => c.Behavioural);

        return Ok(await query.OrderBy(c => c.Id).ToListAsync());
    }

    [HttpGet("techstacks")]
    public async Task<IActionResult> GetTechStacks() =>
        Ok(await db.Cards
            .Where(c => c.TechStack != "")
            .Select(c => c.TechStack)
            .Distinct()
            .OrderBy(t => t)
            .ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var card = await db.Cards.FindAsync(id);
        return card is null ? NotFound() : Ok(card);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Card card)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        db.Cards.Add(card);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = card.Id }, card);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Card card)
    {
        if (id != card.Id) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);
        db.Cards.Update(card);
        await db.SaveChangesAsync();
        return Ok(card);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var card = await db.Cards.FindAsync(id);
        if (card is null) return NotFound();
        db.Cards.Remove(card);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
