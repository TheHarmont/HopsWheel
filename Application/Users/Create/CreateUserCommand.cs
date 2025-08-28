using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Users.Create;
public sealed record CreateUserCommand : IRequest<Result>
{
    public string UserName { get; set; }
    public string Password { get; set; }

    public Role Role { get; set; }
}
