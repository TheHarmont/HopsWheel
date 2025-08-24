using Application.Abstractions;
using Application.Prizes.Delete;
using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Create;
public class UpdatePrizeCommandHandler(IPrizeRepository prizeRepository) : IRequestHandler<UpdatePrizeCommand, Result>
{
    public async Task<Result> Handle(DeletePrizeCommand command, CancellationToken ct = default)
    {
        var prize = await prizeRepository.GetAsync(p => p.Id == command.Id, ct);

        if (prize == null) return Result<bool>.Failure(Error.NotFound("Prize.NotFound",$"Не найден объект с id {command.Id}"));

        // Мягкое удаление
        prize.IsDeleted = true;

        await prizeRepository.UpdateAsync(prize, ct);

        return Result<Guid>.Success(prize.Id);
    }
}
