using Application;
using Application.Abstractions;
using Domain.Entities;
using Infrastructure;
using Infrastructure.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System;
using Web.Api;
using Web.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);
var confinguration = builder.Configuration;

// Add services to the container.
builder.Services.AddPresentation();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(confinguration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.ApplyMigrations();
}

app.UseCors("FrontendPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    await context.Database.EnsureCreatedAsync();

    // Создаем пользователя по умолчанию 
    if (!await context.Users.AnyAsync(u => u.UserName == "admin"))
    {
        context.Users.Add(new(
            "dd987543-6328-4661-b275-57166dede651",
            "admin",
            Role.admin,
            "3A6A6A7B0770F3915BAB1A43C1EC7A324A94949148018892D37085BD4B2C06DC-E34B645352DB461675CCBBD82303D2E8")
            );

        await context.SaveChangesAsync();
    }
}

app.Run();
