using Domain.Entities;

namespace Application.Prizes.GetById;
public class GetByIdPrizeQueryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Weight { get; set; }
    public bool IsActive { get; set; }
}
