using Application.Prizes.GetAll;
using Application.Users.GetAll;
using Application.Wheel.GetAvailablePrizesName;
using Application.Wheel.GetSpinHistory;
using Application.Wheel.GetSpinResult;
using Application.Wheel.WinConfirm;
using Domain.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/wheel")]
[Authorize]
[ApiController]
public class WheelController : BaseController
{
    [HttpGet("get-available-prizes")]
    public async Task<IResult> GetAvailablePrizes(CancellationToken ct = default)
    {
        Result<List<string>> result = await Mediator.Send(new GetAvailablePrizesNameQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("spin")]
    public async Task<IResult> PerformSpin(Guid userId, CancellationToken ct = default)
    {
        Result<GetSpinResultQueryDto> result = await Mediator.Send(new GetSpinResultQuery() 
        { 
            UserId = userId 
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("get-spin-history")]
    public async Task<IResult> GetSpinHistory([FromQuery]int take = 10, CancellationToken ct = default)
    {
        Result<List<GetSpinHistoryQueryDto>> result = await Mediator.Send(new GetSpinHistoryQuery()
        {
            Take = take
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("win-confirm")]
    public async Task<IResult> WinConfirm(WinConfirmCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
