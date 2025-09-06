using Domain.Entities;

namespace Application.Prizes.GetAll;
public class GetAllPrizesQueryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Weight { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public int MaxUses { get; set; }
}
