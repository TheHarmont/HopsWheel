using FluentValidation;

namespace Application.Prizes.Update;
public class UpdatePrizeCommandValidator : AbstractValidator<UpdatePrizeCommand>
{
    public UpdatePrizeCommandValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .WithMessage("Название не должно быть пустым");
        RuleFor(p => p.Weight)
            .InclusiveBetween(1, 10)
            .WithMessage("Шанс выпадения должен быть в диапазоне от 1, до 10");
        RuleFor(p => p.MaxUses)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Количество выпадений не может быть отрицательным");
    }
}
