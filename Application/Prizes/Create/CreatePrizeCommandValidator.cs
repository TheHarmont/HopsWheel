using Domain.Primitives;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Application.Prizes.Create;
public class CreatePrizeCommandValidator : AbstractValidator<CreatePrizeCommand>
{
    public CreatePrizeCommandValidator()
    {
        // Свойство Surname должно быть не равно null
        RuleFor(p => p.Name)
            .NotEmpty()
            .WithMessage("Название не должно быть пустым!");
        RuleFor(p => p.Weight)
            .InclusiveBetween(0,11)
            .WithMessage("Шанс выпадения должен быть в диапазоне от 1, до 10!");
    }
}
