using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Create;
internal sealed class RegisterUserCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher)
    : IRequestHandler<CreateUserCommand, Result>
{
    public async Task<Result> Handle(CreateUserCommand command, CancellationToken ct = default)
    {
        CreateUserCommandValidator validator = new();
        var validationResult = validator.Validate(command);
        if (!validationResult.IsValid)
        {
            return Result.Failure(Error.Validation("User.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации"));
        }

        if (await userRepository.Query().AnyAsync(u => u.UserNameNormalize == command.UserName.ToUpper(), ct))
        {
            return Result.Failure(Error.Conflict("User.Conflict", "Пользователь с таким имененм уже существет!"));
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = command.UserName,
            UserNameNormalize = command.UserName.ToUpper(),
            Role = command.Role,
            PasswordHash = passwordHasher.Hash(command.Password),
            IsActive = true
        };

        await userRepository.AddAsync(user, ct);

        return Result.Success(user.Id);
    }
}
