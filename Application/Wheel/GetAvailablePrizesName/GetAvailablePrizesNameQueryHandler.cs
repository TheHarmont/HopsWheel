using Application.Abstractions;
using Application.Wheel.GetSpinResult;
using Domain.Primitives;
using MediatR;

namespace Application.Wheel.GetAvailablePrizesName;
internal sealed class GetAvailablePrizesNameQueryHandler(
    IPrizeRepository prizeRepository) : IRequestHandler<GetAvailablePrizesNameQuery, Result<List<string>>>
{
    public async Task<Result<List<string>>> Handle(GetAvailablePrizesNameQuery query, CancellationToken ct = default)
    {
        var availablePrizes = await prizeRepository.GetAvailablePrizes();
        if (availablePrizes.Count == 0)
        {
            return Result.Failure<List<string>>(Error.NotFound("Spin.NotFound", "Нет доступных призов"));
        }

        var availablePrizesName = availablePrizes.Select(x => x.Name).ToList();

        return Result.Success(availablePrizesName);
    }
}
