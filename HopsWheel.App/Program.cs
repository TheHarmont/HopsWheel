using Application;
using HopsWheel.App;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var confinguration = builder.Configuration;

// Add services to the container.
builder.Services.AddPresentation();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(confinguration);

var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
