using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Update;
public class UpdatePrizeCommandHandler(IPrizeRepository prizeRepository) : IRequestHandler<UpdatePrizeCommand, Result>
{
    public async Task<Result> Handle(UpdatePrizeCommand command, CancellationToken ct = default)
    {
        UpdatePrizeCommandValidator validator = new();
        var validationResult = validator.Validate(command);
        if (!validationResult.IsValid)
        {
            return Result.Failure<Guid>(Error.Validation("Prize.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации!"));
        }

        var prize = await prizeRepository.GetAsync(p => p.Id == command.Id, ct);
        if (prize == null) return Result.Failure(Error.NotFound("Prize.NotFound", $"Приз не найден"));

        prize.Name = command.Name;
        prize.Weight = command.Weight;
        prize.IsActive = command.IsActive;
        prize.UpdatedAt = DateTime.UtcNow;

        await prizeRepository.UpdateAsync(prize, ct);

        return Result.Success(prize.Id);
    }
}