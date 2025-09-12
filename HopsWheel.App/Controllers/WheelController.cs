using Application.Prizes.GetAll;
using Application.Users.GetAll;
using Application.Wheel.GetAvailablePrizesName;
using Application.Wheel.GetSpinResult;
using Application.Wheel.WinConfirm;
using Domain.Primitives;
using HopsWheel.App.Extensions;
using HopsWheel.App.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HopsWheel.App.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class WheelController : BaseController
{
    [HttpGet("GetAvailablePrizes")]
    public async Task<IResult> GetAvailablePrizes(CancellationToken ct = default)
    {
        Result<List<string>> result = await Mediator.Send(new GetAvailablePrizesNameQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("PerformSpin")]
    public async Task<IResult> PerformSpin(Guid userId, CancellationToken ct = default)
    {
        Result<GetSpinResultQueryDto> result = await Mediator.Send(new GetSpinResultQuery()
        {
            UserId = userId
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("WinConfirm")]
    public async Task<IResult> WinConfirm(Guid spinId, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(new WinConfirmCommand()
        {
            SpinId = spinId
        }, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
