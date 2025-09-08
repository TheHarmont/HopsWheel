using Domain.Primitives;
using MediatR;

namespace Application.Wheel.GetAvailablePrizesName;
public sealed record GetAvailablePrizesNameQuery : IRequest<Result<List<string>>>
{
}
