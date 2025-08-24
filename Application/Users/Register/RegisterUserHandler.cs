using Application.Abstractions;
using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Register;
internal sealed class RegisterUserCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher)
    : IRequestHandler<RegisterUserCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        RegisterUserCommandValidator validator = new();
        var validationResult = validator.Validate(command);
        if (!validationResult.IsValid)
        {
            return Result<Guid>.Failure<Guid>(Error.Validation("User.Validation", validationResult.Errors[0]?.ErrorMessage ?? "Ошибка валидации"));
        }

        if (await userRepository.Query().AnyAsync(u => u.UserNameNormalize == command.UserName.ToUpper(), cancellationToken))
        {
            return Result<Guid>.Failure<Guid>(Error.Conflict("User.Conflict", "Пользователь с таким имененм уже существет!"));
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = command.UserName,
            UserNameNormalize = command.UserName.ToUpper(),
            Role = command.Role,
            PasswordHash = passwordHasher.Hash(command.Password)
        };

        await userRepository.AddAsync(user, cancellationToken);

        return Result<Guid>.Success(user.Id);
    }
}
