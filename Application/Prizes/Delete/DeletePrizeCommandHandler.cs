using Application.Abstractions;
using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Delete;
public class DeletePrizeCommandHandler(IPrizeRepository prizeRepository) : IRequestHandler<DeletePrizeCommand, Result>
{
    public async Task<Result> Handle(DeletePrizeCommand command, CancellationToken ct = default)
    {
        var prize = await prizeRepository.GetAsync(p => p.Id == command.Id, ct);

        if (prize == null) return Result<bool>.Failure(Error.NotFound("Prize.NotFound", $"Не найден объект с id {command.Id}"));
        if (prize.IsDeleted) return Result<bool>.Failure(Error.Conflict("Prize.Conflict", $"Данный объект уже помечен как удаленный"));

        // Мягкое удаление
        prize.IsDeleted = true;
        prize.DeletedAt = DateTime.UtcNow;

        await prizeRepository.UpdateAsync(prize, ct);

        return Result<Guid>.Success(prize.Id);
    }
}
