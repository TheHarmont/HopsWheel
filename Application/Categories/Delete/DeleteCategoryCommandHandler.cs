using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Create;
public class DeleteCategoryCommandHandler(
    ICategoryRepository categoryRepository, 
    IPrizeRepository prizeRepository) 
    : IRequestHandler<DeleteCategoryCommand, Result<int>>
{
    public async Task<Result<int>> Handle(DeleteCategoryCommand command, CancellationToken ct = default)
    {
        Category? category = await categoryRepository
            .Query()
            .Include(c => c.Prizes)
            .Where(c => c.Id == command.Id)
            .FirstOrDefaultAsync();

        if (category == null)
        {
            return Result<int>.Failure<int>(Error.NotFound("Category.NotFound", $"Не найдена категория с id {command.Id}"));
        }

        // Помечаем удаленными все зависимые призы
        foreach(Prize prize in category.Prizes)
        {
            prize.IsDeleted = true;
            prize.DeletedAt = DateTime.UtcNow;
            await prizeRepository.UpdateAsync(prize);
        }

        category.IsDeleted = true;
        await categoryRepository.UpdateAsync(category, ct);

        return Result<int>.Success(category.Id);
    }
}
