using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.GetAll;
internal sealed class GetAllUsersQueryHandler(
    IUserRepository userRepository) : IRequestHandler<GetAllUsersQuery, Result<List<GetAllUsersQueryDto>>>
{
    public async Task<Result<List<GetAllUsersQueryDto>>> Handle(GetAllUsersQuery query, CancellationToken ct = default)
    {
        var users = await userRepository
            .Query()
            .AsNoTracking()
            .Select(u => new GetAllUsersQueryDto()
            {
                Id = u.Id,
                UserName = u.UserName,
                Role = u.Role.ToString(),
                IsActive = u.IsActive,
            })
            .ToListAsync(ct) ?? new();

        return Result.Success(users);
    }
}
