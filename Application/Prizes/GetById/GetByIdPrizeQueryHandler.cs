using Application.Abstractions;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prizes.GetById;
internal sealed class GetByIdPrizeQueryHandler(
    IPrizeRepository prizeRepository) : IRequestHandler<GetByIdPrizeQuery, Result<GetByIdPrizeQueryDto>>
{
    public async Task<Result<GetByIdPrizeQueryDto>> Handle(GetByIdPrizeQuery query, CancellationToken ct = default)
    {
        var prize = await prizeRepository.GetAsync(u => u.Id == query.Id);

        if (prize == null)
        {
            return Result.Failure<GetByIdPrizeQueryDto>(Error.NotFound("Prize.NotFound", "Объект не найден"));
        }

        var response = new GetByIdPrizeQueryDto
        {
            Id = prize.Id,
            Name = prize.Name,
            Weight = prize.Weight,
            MaxUses = prize.MaxUses,
            IsActive = prize.IsActive,
            IsDeleted = prize.IsDeleted
        };

        return Result.Success(response);
    }
}
