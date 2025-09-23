using Application.Roles.GetAll;
using Application.Users.Create;
using Application.Users.GetAll;
using Application.Users.GetById;
using Application.Users.Update;
using Domain.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/user")]
[Authorize(Roles = "admin")]
[ApiController]
public class UserController : BaseController
{
    [HttpGet("get-all")]
    public async Task<IResult> GetAll(CancellationToken ct = default)
    {
        Result<List<GetAllUsersQueryDto>> result = await Mediator.Send(new GetAllUsersQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("get-by-id")]
    public async Task<IResult> GetById(Guid id, CancellationToken ct = default)
    {
        Result<GetByIdUserQueryDto> result = await Mediator.Send(new GetByIdUserQuery() {
            Id = id
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("get-all-roles")]
    public async Task<IResult> GetAllRoles(CancellationToken ct = default)
    {
        Result<string[]> result = await Mediator.Send(new GetAllRolesQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("create")]
    public async Task<IResult> Create(CreateUserCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpPut("update")]
    public async Task<IResult> Update(UpdateUserCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
