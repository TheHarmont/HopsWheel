using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using System.Buffers.Text;

namespace Application.Wheel.GetSpinResult;
internal sealed class GetSpinResultQueryHandler(
    IPrizeRepository prizeRepository,
    ISpinRepository spinRepository) : IRequestHandler<GetSpinResultQuery, Result<GetSpinResultQueryDto>>
{
    public async Task<Result<GetSpinResultQueryDto>> Handle(GetSpinResultQuery query, CancellationToken ct = default)
    {
        // Получаем доступные призы
        var availablePrizes = await prizeRepository.GetAvailablePrizes();
        if (availablePrizes.Count == 0)
        {
            return Result.Failure<GetSpinResultQueryDto>(Error.NotFound("Spin.NotFound", "Нет доступных призов"));
        }

        // Взвешанный рандом
        Prize? prize = GetPrizeBasedOnWeights(availablePrizes);
        if(prize == null)
        {
            return Result.Failure<GetSpinResultQueryDto>(Error.Problem("Spin.Problem","Не удалось определить приз"));
        }

        // Регистрируем вращение
        Guid spinId = Guid.NewGuid();
        Spin spin = new()
        {
            Id = spinId,
            PrizeId = prize.Id,
            PrizeNameAtTime = prize.Name,
            SpinDate = DateTime.UtcNow,
            UserId = query.UserId,
            WasIssued = false
        };
        await spinRepository.AddAsync(spin);

        return Result.Success(new GetSpinResultQueryDto()
        {
            SpinId = spinId,
            PrizeName = prize.Name,
        });
    }

    private Prize? GetPrizeBasedOnWeights(List<Prize> prizes)
    {
        int totalWeight = prizes.Sum(p => p.Weight);
        int random = new Random().Next(0, totalWeight);
        int sum = 0;

        for (int i = 0; i < prizes.Count; i++)
        {
            sum += prizes[i].Weight;
            if (sum >= random)
            {
                return prizes[i];
            }
        }

        return null;
    }
}
