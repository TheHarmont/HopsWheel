using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Users.GetAll;
public sealed record GetAllUsersQuery : IRequest<Result<List<GetAllUsersQueryDto>>>
{
}
