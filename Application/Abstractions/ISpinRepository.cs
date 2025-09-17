using Core.Infrastructure.Repositories;
using Domain.Entities;

namespace Application.Abstractions;

public interface ISpinRepository : IAsyncRepository<Spin>
{
    public Task<List<Spin>> GetLatestSpins(int take, CancellationToken ct = default);
}