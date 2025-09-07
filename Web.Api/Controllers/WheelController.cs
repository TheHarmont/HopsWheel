using Application.Prizes.GetAll;
using Domain.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class WheelController : BaseController
{
    [HttpGet("GetPrizes")]
    public async Task<IResult> GetPrizes(CancellationToken ct = default)
    {
        Result<List<string>> result = await Mediator.Send(new GetCurrentPrizesQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("GetPrize")]
    public async Task<IResult> GetPrize(CancellationToken ct = default)
    {
        await Task.Delay(1000);
        string[] prizes = new[] { "Приз1", "Приз2", "Приз3", "Приз4", "Приз5", "Приз6", "Приз7", };
        var result = Result.Success(prizes[new Random().Next(prizes.Length-1)]);
        return result.Match(Results.Ok, CustomResults.Problem);
    }
}
