using Application.Prizes.Delete;
using Domain.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PrizeController : BaseController
{
    [HttpGet("Add")]
    [Authorize(Roles = "barmen")]
    public async Task<IResult> Create()
    {
        throw new NotImplementedException();
    }

    [HttpGet("Update")]
    [Authorize(Roles = "barmen")]
    public async Task<IResult> Update()
    {
        throw new NotImplementedException();
    }

    [HttpGet("Delete")]
    [Authorize(Roles = "barmen")]
    public async Task<IResult> Delete(DeletePrizeCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
