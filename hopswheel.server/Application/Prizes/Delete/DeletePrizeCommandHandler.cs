using Application.Abstractions;
using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Delete;
public class DeletePrizeCommandHandler(IPrizeRepository prizeRepository) : IRequestHandler<DeletePrizeCommand, Result>
{
    public async Task<Result> Handle(DeletePrizeCommand command, CancellationToken ct = default)
    {
        var prize = await prizeRepository.GetAsync(p => p.Id == command.Id, ct);

        if (prize == null) return Result.Failure(Error.NotFound("Prize.NotFound", $"Объект не найден"));
        if (prize.IsDeleted) return Result.Failure(Error.Conflict("Prize.Conflict", $"Данный объект уже помечен как удаленный"));

        // Мягкое удаление
        prize.IsDeleted = true;
        prize.DeletedAt = DateTime.UtcNow;

        await prizeRepository.UpdateAsync(prize, ct);

        return Result.Success(prize.Id);
    }
}
