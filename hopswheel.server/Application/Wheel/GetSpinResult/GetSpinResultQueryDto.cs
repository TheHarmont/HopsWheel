using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Wheel.GetSpinResult;
public class GetSpinResultQueryDto
{
    public Guid SpinId { get; set; }
    public string PrizeName { get; set; }
}
