using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Delete;
public sealed record DeletePrizeCommand : IRequest<Result>
{
    public Guid Id { get; set; }
}