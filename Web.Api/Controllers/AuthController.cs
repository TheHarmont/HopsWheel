using Application.Users.Login;
using Domain.Primitives;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Extensions;
using Web.Api.Tools;

namespace Web.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseController
{
    [HttpPost("Login")]
    public async Task<IResult> Login(LoginUserCommand command, CancellationToken ct = default)
    {
        Result<string> result = await Mediator.Send(command, ct);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}
