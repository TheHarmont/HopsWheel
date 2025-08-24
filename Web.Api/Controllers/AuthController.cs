using Application.Users.Login;
using Application.Users.Register;
using Domain.Primitives;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseController
{
    [HttpPost("Register")]
    [Authorize(Roles = "admin")]
    public async Task<IResult> Register(RegisterUserCommand command, CancellationToken ct = default)
    {
        Result<Guid> result = await Mediator.Send(command, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("Login")]
    public async Task<IResult> Login(LoginUserCommand command, CancellationToken ct = default)
    {
        Result<string> result = await Mediator.Send(command, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}
