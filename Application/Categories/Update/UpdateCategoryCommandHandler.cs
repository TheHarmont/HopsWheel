using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Create;
public class UpdateCategoryCommandHandler(ICategoryRepository categoryRepository) : IRequestHandler<UpdateCategoryCommand, Result<int>>
{
    public async Task<Result<int>> Handle(UpdateCategoryCommand command, CancellationToken ct = default)
    {
        UpdateCategoryCommandValidator validator = new();
        var validationResult = validator.Validate(command);
        if (!validationResult.IsValid)
        {
            return Result<int>.Failure<int>(Error.Validation("Category.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации!"));
        }

        if (await categoryRepository.Query().AnyAsync(c => c.NameNormalize == command.Name.ToUpper()))
        {
            return Result<int>.Failure<int>(Error.Failure("Category.Failure", "Нельзя изменить имя на уже существующее"));
        }

        Category? category = await categoryRepository.GetAsync(c => c.Id == command.Id, ct);
        if (category == null)
        {
            return Result<int>.Failure<int>(Error.NotFound("Category.NotFound", $"Не найдена категория с id {command.Id}"));
        }

        category.Name = command.Name;
        category.NameNormalize = command.Name.ToUpper();
        category.Description = command.Description;

        await categoryRepository.UpdateAsync(category, ct);

        return Result<int>.Success(category.Id);
    }
}
