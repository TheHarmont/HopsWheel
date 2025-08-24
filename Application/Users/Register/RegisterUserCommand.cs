using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Users.Register;
public sealed record RegisterUserCommand : IRequest<Result<Guid>>
{
    public string UserName { get; set; }
    public string Password { get; set; }

    public Role Role { get; set; } = Role.barmen;
}
