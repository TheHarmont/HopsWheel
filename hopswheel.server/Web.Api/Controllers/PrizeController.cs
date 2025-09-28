using Application.Prizes.Create;
using Application.Prizes.Delete;
using Application.Prizes.GetAll;
using Application.Prizes.GetById;
using Application.Prizes.Update;
using Domain.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/prize")]
[ApiController]
[Authorize]
public class PrizeController : BaseController
{
    [HttpGet("get-all")]
    public async Task<IResult> GetAll(CancellationToken ct = default)
    {
        Result<List<GetAllPrizesQueryDto>> result = await Mediator.Send(new GetAllPrizesQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("get-by-id")]
    public async Task<IResult> GetById(Guid id, CancellationToken ct = default)
    {
        Result<GetByIdPrizeQueryDto> result = await Mediator.Send(new GetByIdPrizeQuery()
        {
            Id = id
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("create")]
    public async Task<IResult> Create(CreatePrizeCommand command, CancellationToken ct = default)
    {
        Result<Guid> result = await Mediator.Send(command, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPut("update")]
    public async Task<IResult> Update(UpdatePrizeCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpDelete("delete")]
    public async Task<IResult> Delete(Guid id, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(new DeletePrizeCommand()
        {
            Id = id
        }, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
