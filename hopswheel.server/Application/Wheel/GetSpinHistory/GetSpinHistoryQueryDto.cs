using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Wheel.GetSpinHistory;
public class GetSpinHistoryQueryDto
{
    public Guid Id { get; set; }
    public Guid PrizeId { get; set; }
    public string PrizeName { get; set; }
}
