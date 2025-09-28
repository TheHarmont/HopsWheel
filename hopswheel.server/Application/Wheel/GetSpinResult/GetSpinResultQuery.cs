using Domain.Primitives;
using MediatR;

namespace Application.Wheel.GetSpinResult;
public sealed record GetSpinResultQuery : IRequest<Result<GetSpinResultQueryDto>>
{
    public Guid UserId { get; set; }
}
