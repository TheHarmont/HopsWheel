using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Create;
public class CreateCategoryCommandHandler(ICategoryRepository categoryRepository) : IRequestHandler<CreateCategoryCommand, Result<int>>
{
    public async Task<Result<int>> Handle(CreateCategoryCommand command, CancellationToken ct = default)
    {
        CreateCategoryCommandValidator validator = new();
        var validationResult = validator.Validate(command);
        if (!validationResult.IsValid)
        {
            return Result<int>.Failure<int>(Error.Validation("Category.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации!"));
        }

        Category category = new()
        {
            Name = command.Name,
            NameNormalize = command.Name.ToUpper(),
            Description = command.Description
        };

        await categoryRepository.AddAsync(category, ct);

        return Result<int>.Success(category.Id);
    }
}
