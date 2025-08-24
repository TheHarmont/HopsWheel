using Application.Abstractions;
using Core.Infrastructure.Repositories;
using Domain.Entities;
using Infrastructure.Context;

namespace Infrastructure.Repositories;
public class CategoryRepository(ApplicationDbContext context) : RepositoryBase<Category, ApplicationDbContext>(context), ICategoryRepository
{
}
