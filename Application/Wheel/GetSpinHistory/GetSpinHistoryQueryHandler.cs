using Application.Abstractions;
using Domain.Primitives;
using MediatR;

namespace Application.Wheel.GetSpinHistory;
internal sealed class GetSpinHistoryQueryHandler(
    ISpinRepository spinRepository) : IRequestHandler<GetSpinHistoryQuery, Result<List<GetSpinHistoryQueryDto>>>
{
    public async Task<Result<List<GetSpinHistoryQueryDto>>> Handle(GetSpinHistoryQuery query, CancellationToken ct = default)
    {
        var spins = await spinRepository.GetLatestSpins(query.Take);

        if (spins.Count == 0)
        {
            return Result.Failure<List<GetSpinHistoryQueryDto>>(Error.NotFound("Spin.NotFound", "Нет доступных призов"));
        }

        var spinHistory = spins.Select(s => new GetSpinHistoryQueryDto()
        {
            Id = s.Id,
            PrizeId = s.PrizeId,
            PrizeName = s.PrizeNameAtTime
        }).ToList();

        return Result.Success(spinHistory);
    }
}
