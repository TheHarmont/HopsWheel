using Domain.Primitives;
using MediatR;

namespace Application.Prizes.GetAll;
public sealed record GetAllPrizesQuery : IRequest<Result<List<GetAllPrizesQueryDto>>>
{
}
