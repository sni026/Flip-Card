using System.ComponentModel.DataAnnotations;

namespace FlipCardApi.Models;

public class Card
{
    public int Id { get; set; }

    [Required]
    public string Question { get; set; } = string.Empty;

    [Required]
    public string Answer { get; set; } = string.Empty;

    public bool Behavioural { get; set; }

    public bool Foundation {get; set; }

    public bool Scenario { get; set; }

    public bool Starred { get; set; }

    public string TechStack { get; set; } = string.Empty;
}
