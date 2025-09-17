using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Wheel.WinConfirm;
internal sealed class WinConfirmCommandHandler(ISpinRepository spinRepository) : IRequestHandler<WinConfirmCommand, Result>
{
    public async Task<Result> Handle(WinConfirmCommand command, CancellationToken ct = default)
    {
        Spin? spin = await spinRepository.GetAsync(s => s.Id == command.SpinId);

        if (spin == null) return Result.Failure(Error.NotFound("Spin.NotFound", "Выполненное вращение не найдено"));

        spin.WasIssued = true;

        await spinRepository.UpdateAsync(spin);

        return Result.Success();
    }
}
