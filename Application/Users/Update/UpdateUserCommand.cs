using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Users.Update;
public sealed record UpdateUserCommand : IRequest<Result>
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public Role Role { get; set; }
    public bool IsActive { get; set; }
}
