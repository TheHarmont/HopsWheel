using Domain.Entities;
using Domain.Primitives;
using MediatR;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Text.Json.Serialization;

namespace Application.Users.Create;
public sealed record CreateUserCommand : IRequest<Result>
{
    public string UserName { get; set; }
    public string Password { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Role Role { get; set; }
}
