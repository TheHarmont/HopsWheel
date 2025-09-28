using Application.Abstractions;
using Core.Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;
public class SpinRepository(ApplicationDbContext context) : RepositoryBase<Spin, ApplicationDbContext>(context), ISpinRepository
{
    public async Task<List<Spin>> GetLatestSpins(int take, CancellationToken ct = default)
    {
        return await context
            .Set<Spin>()
            .AsNoTracking()
            .Where(s => s.WasIssued)
            .OrderByDescending(s => s.SpinDate)
            .Take(take)
            .ToListAsync() ?? new();
    }
}
