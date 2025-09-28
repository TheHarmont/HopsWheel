using Domain.Primitives;
using MediatR;

namespace Application.Users.Login;
public sealed record LoginUserCommand : IRequest<Result<string>>
{
    public string UserName { get; set; }
    public string Password { get; set; }
}
