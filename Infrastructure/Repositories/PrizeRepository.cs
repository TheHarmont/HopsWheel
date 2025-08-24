using Application.Abstractions;
using Core.Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Context;

namespace Infrastructure.Repositories;
public class PrizeRepository(ApplicationDbContext context) : RepositoryBase<Prize, ApplicationDbContext>(context), IPrizeRepository
{
}
