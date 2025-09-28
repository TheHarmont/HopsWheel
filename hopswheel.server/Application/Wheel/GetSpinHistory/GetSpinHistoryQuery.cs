using Domain.Primitives;
using MediatR;

namespace Application.Wheel.GetSpinHistory;
public sealed record GetSpinHistoryQuery : IRequest<Result<List<GetSpinHistoryQueryDto>>>
{
    /// <summary>
    /// Количество возвращаемых записей
    /// </summary>
    public int Take { get; set; }
}
