using Application.Users.Create;
using Application.Users.GetAll;
using Application.Users.GetById;
using Application.Users.Login;
using Application.Users.Update;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class UserController : BaseController
{
    [HttpGet("GetAll")]
    public async Task<IResult> GetAll(CancellationToken ct = default)
    {
        Result<List<GetAllUserQueryDto>> result = await Mediator.Send(new GetAllUserQuery(), ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpGet("GetById")]
    public async Task<IResult> GetById(Guid Id, CancellationToken ct = default)
    {
        Result<GetByIdUserQueryDto> result = await Mediator.Send(new GetByIdUserQuery() {
            Id = Id
        }, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("Create")]
    public async Task<IResult> Create(CreateUserCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpPut("Update")]
    public async Task<IResult> Update(UpdateUserCommand command, CancellationToken ct = default)
    {
        Result result = await Mediator.Send(command, ct);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}
