using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Delete;
public sealed record UpdatePrizeCommand : IRequest<Result>
{
    public Guid Id { get; set; }
}