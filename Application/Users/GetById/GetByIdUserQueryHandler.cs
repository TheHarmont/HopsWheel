using Application.Abstractions;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.GetById;
internal sealed class GetByIdUserQueryHandler(
    IUserRepository userRepository) : IRequestHandler<GetByIdUserQuery, Result<GetByIdUserQueryDto>>
{
    public async Task<Result<GetByIdUserQueryDto>> Handle(GetByIdUserQuery query, CancellationToken ct = default)
    {
        var user = await userRepository.GetAsync(u => u.Id == query.Id);

        if (user == null)
        {
            return Result.Failure<GetByIdUserQueryDto>(Error.NotFound("User.NotFound", "Пользователь не найден!"));
        }

        var response = new GetByIdUserQueryDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Role = user.Role.ToString(),
            IsActive = user.IsActive
        };

        return Result.Success(response);
    }
}
