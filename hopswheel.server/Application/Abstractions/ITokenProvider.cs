using Domain.Entities;

namespace Application.Abstractions;

public interface ITokenProvider
{
    string Create(User user);
}