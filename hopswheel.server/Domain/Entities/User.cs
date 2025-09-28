using Core.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;

namespace Domain.Entities;
[Index(nameof(UserNameNormalize))]
public sealed class User : Entity
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string UserNameNormalize { get; set; }
    public Role Role { get; set; }
    public bool IsActive { get; set; }
    public string PasswordHash { get; set; }

    public User()
    {
    }

    public User(Guid id, string userName, Role role, string passwordHash) : this()
    {
        Id = id;
        UserName = userName;
        UserNameNormalize = userName.ToUpper();
        Role = role;
        IsActive = true;
        PasswordHash = passwordHash;
    }

    public User(string id, string userName, Role role, string passwordHash) : this()
    {
        Id = Guid.Parse(id);
        UserName = userName;
        UserNameNormalize = userName.ToUpper();
        Role = role;
        IsActive = true;
        PasswordHash = passwordHash;
    }
}
