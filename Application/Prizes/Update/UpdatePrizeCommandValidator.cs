using Application.Prizes.Delete;
using FluentValidation;

namespace Application.Prizes.Create;
public class UpdatePrizeCommandValidator : AbstractValidator<UpdatePrizeCommand>
{
    public UpdatePrizeCommandValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .WithMessage("Название не должно быть пустым!");

        RuleFor(p => p.Weight)
            .InclusiveBetween(0,11)
            .WithMessage("Шанс выпадения должен быть в диапазоне от 1, до 10!");
    }
}
