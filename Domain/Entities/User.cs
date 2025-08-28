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
}
