using Application.Abstractions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Database.Context;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options)
{

    public DbSet<User> Users { get; set; }
    public DbSet<Spin> Spins { get; set; }
    public DbSet<Prize> Prizes { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<PrizeUsage> PrizeUsages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        modelBuilder.HasDefaultSchema("public");
    }
}
