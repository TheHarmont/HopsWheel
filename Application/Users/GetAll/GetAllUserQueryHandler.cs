using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.GetAll;
internal sealed class GetAllUserQueryHandler(
    IUserRepository userRepository) : IRequestHandler<GetAllUserQuery, Result<List<GetAllUserQueryDto>>>
{
    public async Task<Result<List<GetAllUserQueryDto>>> Handle(GetAllUserQuery query, CancellationToken ct = default)
    {
        var users = await userRepository
            .Query()
            .AsNoTracking()
            .Select(u => new GetAllUserQueryDto()
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
