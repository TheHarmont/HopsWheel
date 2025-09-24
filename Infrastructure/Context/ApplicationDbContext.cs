using Application.Abstractions;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IPasswordHasher passwordHasher)
    : DbContext(options)
{

    public DbSet<User> Users { get; set; }
    public DbSet<Spin> Spins { get; set; }
    public DbSet<Prize> Prizes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //-> Seed Data
        modelBuilder.Entity<User>().HasData(new User[] { new("dd987543-6328-4661-b275-57166dede651", "admin", Role.admin, passwordHasher.Hash("admin"))});
    }
}
