using Application.Abstractions;
using Core.Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Context;

namespace Infrastructure.Repositories;
public class SpinRepository(ApplicationDbContext context) : RepositoryBase<Spin, ApplicationDbContext>(context), ISpinRepository
{
}
