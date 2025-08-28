using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Users.GetAll;
public sealed record GetAllUserQuery : IRequest<Result<List<GetAllUserQueryDto>>>
{
}
