using FlipCardApi.Models;
using FlipCardApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlipCardApi.Controllers;

[ApiController]
//[Route("api/[controller]")] -> Base route for all actions in this controller (e.g., api/cards)
[Route("api/[controller]")]
public class CardsController(ICardService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? techStack,
        [FromQuery] bool? technical,
        [FromQuery] bool? behavioural,
        [FromQuery] bool? foundation,
        [FromQuery] bool? advanced,
        [FromQuery] bool? starred)
    {
        var cards = await service.GetFilteredAsync(search, techStack, technical, behavioural, foundation, advanced, starred);
        return Ok(cards);
    }

    [HttpGet("techstacks")]
    public async Task<IActionResult> GetTechStacks()
    {
        var stacks = await service.GetTechStacksAsync();
        return Ok(stacks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var card = await service.GetByIdAsync(id);
        return card is null ? NotFound() : Ok(card);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Card card)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var createdCard = await service.CreateAsync(card);
        return CreatedAtAction(nameof(Get), new { id = createdCard.Id }, createdCard);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Card card)
    {
        if (id != card.Id) return BadRequest();
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var updatedCard = await service.UpdateAsync(card);
        return Ok(updatedCard);
    }

    [HttpPatch("{id}/star")]
    public async Task<IActionResult> SetStarred(int id, StarCardRequest request)
    {
        try
        {
            var card = await service.SetStarredAsync(id, request.Starred);
            return Ok(card);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await service.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    public record StarCardRequest(bool Starred);
}
