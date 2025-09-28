using Application.Abstractions;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Update;
internal sealed class UpdateUserCommandHandler(IUserRepository userRepository)
    : IRequestHandler<UpdateUserCommand, Result>
{
    public async Task<Result> Handle(UpdateUserCommand command, CancellationToken ct = default)
    {
        // Ищем пользователя
        var user = await userRepository.GetAsync(u => u.Id == command.Id);

        if (user == null)
        {
            return Result.Failure(Error.NotFound("User.NotFound", "Пользователь не найден!"));
        }

        if(user.UserName != command.UserName)
        {
            // Если было изменено имя, то проверям на наличие похожего имени в БД
            if (await userRepository.Query().AnyAsync(u => u.UserNameNormalize == command.UserName.ToUpper(), ct))
            {
                return Result.Failure(Error.Conflict("User.Conflict", "Пользователь с таким именем уже существует!"));
            }
        }

        user.UserName = command.UserName;
        user.UserNameNormalize = command.UserName.ToUpper();
        user.Role = command.Role;
        user.IsActive = command.IsActive;

        await userRepository.UpdateAsync(user, ct);

        return Result.Success(user.Id);
    }
}
