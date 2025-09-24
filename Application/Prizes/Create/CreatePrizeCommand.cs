using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Create;
public sealed record CreatePrizeCommand : IRequest<Result<Guid>>
{
    public string Name { get; set; }
    public int Weight { get; set; }
}