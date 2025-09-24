using Domain.Primitives;
using MediatR;

namespace Application.Prizes.GetById;
public sealed record GetByIdPrizeQuery : IRequest<Result<GetByIdPrizeQueryDto>>
{
    public Guid Id { get; set; }
}
