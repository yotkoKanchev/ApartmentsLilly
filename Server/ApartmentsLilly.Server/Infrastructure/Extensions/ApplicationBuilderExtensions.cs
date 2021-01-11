namespace ApartmentsLilly.Server.Infrastructure.Extensions
{
    using System.Linq;
    using Data;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using static Infrastructure.GlobalConstants;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
            => app
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Apartments Lilly API");
                    options.RoutePrefix = string.Empty;
                });

        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<ApartmentsLillyDbContext>();

            dbContext.Database.Migrate();
        }

        public static IApplicationBuilder SeedData(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();
            var context = services.ServiceProvider.GetService<ApartmentsLillyDbContext>();

            var roleStore = new RoleStore<IdentityRole>(context);

            if (!context.Roles.Any())
            {
                roleStore.CreateAsync(new IdentityRole() { Name = AdminRole, NormalizedName = AdminRole.ToUpper() }).GetAwaiter().GetResult();
                roleStore.CreateAsync(new IdentityRole() { Name = UserRole, NormalizedName = UserRole.ToUpper() }).GetAwaiter().GetResult();
            }

            context.SaveChanges();

            return app;
        }
    }
}
