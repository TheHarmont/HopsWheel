using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Create;
public sealed record CreatePrizeCommand : IRequest<Result<Guid>>
{
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public int Weight { get; set; } //Шанс выпадения
    public bool IsActive { get; set; }
    public int MaxUses { get; set; }
}