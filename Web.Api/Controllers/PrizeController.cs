using Application.Prizes.Create;
using Application.Prizes.Delete;
using Application.Prizes.Update;
using Domain.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PrizeController : BaseController
{
    [HttpPost("Add")]
    public async Task<IResult> Create(CreatePrizeCommand command, CancellationToken ct = default)
    {
        Result<Guid> result = await Mediator.Send(command, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPut("Update")]
    public async Task<IResult> Update(UpdatePrizeCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpDelete("Delete")]
    public async Task<IResult> Delete(DeletePrizeCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
