using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Prizes.Create;
public class CreatePrizeCommandHandler(IPrizeRepository prizeRepository) : IRequestHandler<CreatePrizeCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle(CreatePrizeCommand command, CancellationToken ct = default)
    {
        CreatePrizeCommandValidator validator = new();
        var validationResult = validator.Validate(command);
        if (!validationResult.IsValid)
        {
            return Result<Guid>.Failure<Guid>(Error.Validation("Prize.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации!"));
        }

        Prize prize = new()
        {
            Id = Guid.NewGuid(),
            Name = command.Name,
            CategoryId = command.CategoryId,
            Weight = command.Weight,
            IsActive = command.IsActive,
            MaxUses = command.MaxUses
        };

        await prizeRepository.AddAsync(prize, ct);

        return Result<Guid>.Success(prize.Id);
    }
}
