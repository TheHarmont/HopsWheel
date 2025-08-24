using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Delete;
public sealed record UpdatePrizeCommand : IRequest<Result>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public int Weight { get; set; }
    public bool IsActive { get; set; }
    public int MaxUses { get; set; } 
}