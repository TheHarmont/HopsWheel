using Core.Infrastructure.Repositories;
using Domain.Entities;

namespace Application.Abstractions;

public interface IPrizeRepository : IAsyncRepository<Prize>
{
}