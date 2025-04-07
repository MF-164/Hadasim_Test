using Microsoft.EntityFrameworkCore;
using Shop_DATA.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Provider> Providers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // הגדרות עבור Foreign Keys
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Product)
            .WithMany()
            .HasForeignKey(o => o.ProductId)
            .OnDelete(DeleteBehavior.Restrict); // או NoAction

        modelBuilder.Entity<Order>()
            .HasOne(o => o.Provider)
            .WithMany()
            .HasForeignKey(o => o.ProviderId)
            .OnDelete(DeleteBehavior.Restrict); // או NoAction

        // הגדרות עבור סוגי עמודות
        modelBuilder.Entity<Order>()
            .Property(o => o.Quantity)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");

        base.OnModelCreating(modelBuilder);
    }
}
