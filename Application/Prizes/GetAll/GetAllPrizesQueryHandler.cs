using Application.Abstractions;
using Application.Users.GetAll;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prizes.GetAll;
internal sealed class GetAllPrizesQueryHandler(
    IPrizeRepository prizeRepository) : IRequestHandler<GetAllPrizesQuery, Result<List<GetAllPrizesQueryDto>>>
{
    public async Task<Result<List<GetAllPrizesQueryDto>>> Handle(GetAllPrizesQuery query, CancellationToken ct = default)
    {
        var prizes = await prizeRepository
           .Query()
           .AsNoTracking()
           .Select(prize => new GetAllPrizesQueryDto()
           {
               Id = prize.Id,
               Name = prize.Name,
               Weight = prize.Weight,
               MaxUses = prize.MaxUses,
               IsActive = prize.IsActive
           })
           .ToListAsync(ct) ?? new();

        return Result.Success(prizes);
    }
}
