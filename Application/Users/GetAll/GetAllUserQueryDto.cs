using Domain.Entities;

namespace Application.Users.GetAll;
public class GetAllUserQueryDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string Role { get; set; }
    public bool IsActive { get; set; }
}
