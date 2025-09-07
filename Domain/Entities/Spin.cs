using Core.Infrastructure.Repositories;

namespace Domain.Entities;
/// <summary>
/// Представляет событие вращение колеса
/// </summary>
public sealed class Spin : Entity
{
    public Guid Id { get; set; }
    public Guid PrizeId { get; set; }
    public Prize? Prize { get; set; }

    /// <summary>
    /// Название приза на момент выигрыша (Если приз был изменен)
    /// </summary>
    public string PrizeNameAtTime { get; set; }

    /// <summary>
    /// Категория приза на момент выигрыша
    /// </summary>
    public string? PrizeCategoryAtTime { get; set; }

    /// <summary>
    /// Дата вращения колеса
    /// </summary>
    public DateTime SpinDate {  get; set; }

    /// <summary>
    /// Кто выполнил кращение
    /// </summary>
    public Guid UserId { get;set; }
    public User User { get; set; }

    /// <summary>
    /// Был ли выдан товар
    /// </summary>
    public bool WasIssued { get; set; }
}
