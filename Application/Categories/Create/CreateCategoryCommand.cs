using Domain.Primitives;
using MediatR;

namespace Application.Categories.Create;
public sealed record CreateCategoryCommand : IRequest<Result<int>>
{
    public string Name { get; set; }

    public string Description { get; set; }
}