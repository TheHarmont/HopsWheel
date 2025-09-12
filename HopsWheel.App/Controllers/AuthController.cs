using Application.Users.Login;
using Domain.Primitives;
using HopsWheel.App.Extensions;
using HopsWheel.App.Tools;
using Microsoft.AspNetCore.Mvc;

namespace HopsWheel.App.Controllers;

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
