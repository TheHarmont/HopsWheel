using Domain.Primitives;
using MediatR;

namespace Application.Users.GetById;
public sealed record GetByIdUserQuery : IRequest<Result<GetByIdUserQueryDto>>
{
    public Guid Id { get; set; }
}
