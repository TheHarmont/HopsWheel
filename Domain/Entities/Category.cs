using Core.Infrastructure.Repositories;

namespace Domain.Entities;

/// <summary>
/// Представляет категорию призов
/// </summary>
public sealed class Category : Entity
{
    public int Id { get; set; }

    public string CategoryName { get; set; }

    public string Description {  get; set; }
}
