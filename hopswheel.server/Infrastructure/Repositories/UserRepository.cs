using Application.Abstractions;
using Core.Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Context;

namespace Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : RepositoryBase<User, ApplicationDbContext>(context), IUserRepository
{
}
