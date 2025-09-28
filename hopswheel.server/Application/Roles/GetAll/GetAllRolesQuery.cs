using Domain.Primitives;
using MediatR;

namespace Application.Roles.GetAll;
public sealed record GetAllRolesQuery : IRequest<Result<string[]>>
{
}
