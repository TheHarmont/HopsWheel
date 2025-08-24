using Core.Infrastructure.Repositories;

namespace Domain.Entities;
public sealed class Prize : Entity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public int Weight { get; set; } = 1;           // Шанс выпадения (1–10). 10 = часто, 1 = редко
    public bool IsActive { get; set; } = true;
    public bool IsDeleted { get; set; } = false;   // Мягкое удаление;
    public int MaxUses { get; set; }              // 0 = бесконечно, 5 = только 5 раз
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
