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
    public async Task<Result<string>> Handle(LoginUserCommand command, CancellationToken cancellationToken)
    {
        User? user = await userRepository
            .Query()
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.UserName == command.UserName, cancellationToken);

        if (user is null)
        {
            return Result<string>.Failure<string>(Error.NotFound("User.NotFount", "Не найден пользователь с таким имененм!"));
        }

        bool verified = passwordHasher.Verify(command.Password, user.PasswordHash);

        if (!verified)
        {
            return Result<string>.Failure<string>(Error.Failure("User.Failure", "Неверный логин или пароль!"));
        }

        string token = tokenProvider.Create(user);

        return Result<string>.Success(token);
    }
}
