using Core.Infrastructure.Repositories;

namespace Domain.Entities;
public sealed class User : Entity
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public Role Role { get; set; }
    public bool IsActive { get; set; } = true;
    public string PasswordHash { get; set; }
}
