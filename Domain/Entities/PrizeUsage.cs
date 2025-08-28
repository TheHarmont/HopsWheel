using Core.Infrastructure.Repositories;

namespace Domain.Entities;
public sealed class PrizeUsage : Entity
{
    public Guid Id { get; set; }
    public Guid PrizeId {  get; set; }
    public Prize Prize { get; set; }
    public DateTime UsageDate { get; set; }
    public int DropsNumber { get; set; }
}
