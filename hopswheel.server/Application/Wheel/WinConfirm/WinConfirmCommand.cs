using Domain.Primitives;
using MediatR;

namespace Application.Wheel.WinConfirm;
public sealed record WinConfirmCommand : IRequest<Result>
{
    public Guid SpinId { get; set; }
}
