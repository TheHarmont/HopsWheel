using Application.Abstractions;
using Application.Users.GetAll;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Roles.GetAll;
internal sealed class GetAllRolesQueryHandler() : IRequestHandler<GetAllRolesQuery, Result<string[]>>
{
    public async Task<Result<string[]>> Handle(GetAllRolesQuery query, CancellationToken ct = default)
    {
        string[] roles = System.Enum.GetNames(typeof(Role));

        return Result.Success(roles);
    }
}
