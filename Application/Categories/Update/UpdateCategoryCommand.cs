using Domain.Entities;
using Domain.Primitives;
using MediatR;

namespace Application.Categories.Create;
public sealed record UpdateCategoryCommand : IRequest<Result<int>>
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
}