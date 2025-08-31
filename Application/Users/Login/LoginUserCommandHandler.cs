using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Login;
internal sealed class LoginUserCommandHandler(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    ITokenProvider tokenProvider) : IRequestHandler<LoginUserCommand, Result<string>>
{
    public async Task<Result<string>> Handle(LoginUserCommand command, CancellationToken ct = default)
    {
        User? user = await userRepository
            .Query()
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.UserNameNormalize == command.UserName.ToUpper(), ct);

        if (user is null)
        {
            return Result.Failure<string>(Error.NotFound("User.NotFount", "Не найден пользователь с таким именем!"));
        }

        bool verified = passwordHasher.Verify(command.Password, user.PasswordHash);

        if (!verified)
        {
            return Result.Failure<string>(Error.Problem("User.Problem", "Неверный логин или пароль!"));
        }

        string token = tokenProvider.Create(user);

        return Result.Success(token);
    }
}
