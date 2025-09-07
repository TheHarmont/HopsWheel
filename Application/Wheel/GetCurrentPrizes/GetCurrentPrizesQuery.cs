using Domain.Primitives;
using MediatR;

namespace Application.Prizes.GetAll;
public sealed record GetCurrentPrizesQuery : IRequest<Result<List<string>>>
{
}
