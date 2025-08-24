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
            return Result<Guid>.Failure<Guid>(Error.Validation("Prize.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации!"));
        }

        var prize = await prizeRepository.GetAsync(p => p.Id == command.Id, ct);
        if (prize == null) return Result<bool>.Failure(Error.NotFound("Prize.NotFound", $"Не найден приз с id {command.Id}"));

        prize.Name = command.Name;
        prize.NameNormalize = command.Name.ToUpper();
        prize.CategoryId = command.CategoryId;
        prize.Weight = command.Weight;
        prize.IsActive = command.IsActive;
        prize.MaxUses = command.MaxUses;
        prize.UpdatedAt = DateTime.UtcNow;

        await prizeRepository.UpdateAsync(prize, ct);

        return Result<Guid>.Success(prize.Id);
    }
}