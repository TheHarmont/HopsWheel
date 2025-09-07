using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Update;
public sealed record UpdatePrizeCommand : IRequest<Result>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Weight { get; set; }
    public bool IsActive { get; set; }
    public int MaxUses { get; set; }
}