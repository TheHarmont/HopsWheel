using Application.Categories.Create;
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
public class CategoryController : BaseController
{
    [HttpPost("Add")]
    public async Task<IResult> Create(CreateCategoryCommand command, CancellationToken ct = default)
    {
        Result<int> result = await Mediator.Send(command, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPut("Update")]
    public async Task<IResult> Update(UpdateCategoryCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpDelete("Delete")]
    public async Task<IResult> Delete(DeleteCategoryCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
