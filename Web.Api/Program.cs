using Application;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Web.Api;

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
}

app.UseCors("FrontendPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
