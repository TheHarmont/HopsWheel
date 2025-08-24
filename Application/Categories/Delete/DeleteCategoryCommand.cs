using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Categories.Create;
public sealed record DeleteCategoryCommand : IRequest<Result<int>>
{
    public int Id { get; set; }
}