using Domain.Entities;

namespace Application.Users.GetById;
public class GetByIdUserQueryDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string Role { get; set; }
    public bool IsActive { get; set; }
}
