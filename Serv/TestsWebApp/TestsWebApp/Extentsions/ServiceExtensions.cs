using Entities.Models;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Repository;
using Service;
using Service.DataShaping;
using Service.Interfaces;
using Shared.DataTransferObjects;

namespace TestsWebApp.Extentsions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services) =>
            services.AddCors(optinins =>
            {
                optinins.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithExposedHeaders("X-Pagination"));
            });
        public static void ConfigureIISIntegration(this IServiceCollection services) =>
          services.Configure<IISOptions>(options =>
          {

          });
        public static void ConfigureRepositoryManager(this IServiceCollection services) =>
            services.AddScoped<IRepositoryManager, RepositoryManager>();

        public static void ConfigureServiceManager(this IServiceCollection services) =>
            services.AddScoped<IServiceManager, ServiceManager>();
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<RepositoryContext>(opts => opts.UseNpgsql(configuration.GetConnectionString("sqlConnection")));
        public static void ConfigureDaraShaper(this IServiceCollection services)
        {
            services.AddScoped<IDataShaper<TestDTO>, DataShaper<TestDTO>>();
            services.AddScoped<IDataShaper<QuestionDTO>, DataShaper<QuestionDTO>>();
        }
    }

}
