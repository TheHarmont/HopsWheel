using Application.Prizes.Create;
using Application.Prizes.Delete;
using Application.Prizes.GetAll;
using Application.Prizes.GetById;
using Application.Prizes.Update;
using Domain.Primitives;
using HopsWheel.App.Extensions;
using HopsWheel.App.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace HopsWheel.App.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PrizeController : BaseController
{
    [HttpGet("GetAll")]
    public async Task<IResult> GetAll(CancellationToken ct = default)
    {
        Result<List<GetAllPrizesQueryDto>> result = await Mediator.Send(new GetAllPrizesQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("GetById")]
    public async Task<IResult> GetById(Guid id, CancellationToken ct = default)
    {
        Result<GetByIdPrizeQueryDto> result = await Mediator.Send(new GetByIdPrizeQuery()
        {
            Id = id
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("Create")]
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
    public async Task<IResult> Delete(Guid id, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(new DeletePrizeCommand()
        {
            Id = id
        }, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
