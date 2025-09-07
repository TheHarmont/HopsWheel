using Application.Abstractions;
using Application.Users.GetAll;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prizes.GetAll;
internal sealed class GetCurrentPrizesQueryHandler(
    IPrizeRepository prizeRepository) : IRequestHandler<GetCurrentPrizesQuery, Result<List<string>>>
{
    public async Task<Result<List<string>>> Handle(GetCurrentPrizesQuery query, CancellationToken ct = default)
    {
        var prizes = await prizeRepository
           .Query()
           .AsNoTracking()
           .Where(prize => !prize.IsDeleted)
           .Select(prize => prize.Name)
           .ToListAsync(ct) ?? new ();

        return Result.Success(prizes);
    }
}
