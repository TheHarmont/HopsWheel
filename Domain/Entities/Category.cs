using Core.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

/// <summary>
/// Представляет категорию призов
/// </summary>
[Index(nameof(NameNormalize))]
public sealed class Category : Entity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Name { get; set; }

    public string NameNormalize { get; set; }

    public string? Description {  get; set; }

    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;

    public ICollection<Prize> Prizes { get; set; } = new List<Prize>();
}
