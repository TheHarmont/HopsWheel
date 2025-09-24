using Application.Abstractions;
using Core.Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace Infrastructure.Repositories;
public class PrizeRepository(ApplicationDbContext context) : RepositoryBase<Prize, ApplicationDbContext>(context), IPrizeRepository
{
    public async Task<List<Prize>> GetAvailablePrizes(CancellationToken ct = default)
    {
        return await context
            .Set<Prize>()
            .AsNoTracking()
            .Where(prize => !prize.IsDeleted && prize.IsActive)
            .ToListAsync(ct) ?? new();
    }
}
