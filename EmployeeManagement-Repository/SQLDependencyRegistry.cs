using EmployeeManagement.Data.Models;
using EmployeeManagement_Repository.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeManagement_Repository
{
    public static class SQLDependencyRegistry
    {
        public static void DependencyRegistry(this IServiceCollection serviceCollection,AppSettings appsettings)
        {
            //serviceCollection.AddDbContext<EmployeeManagementContext>(options =>
            //{
            //    options.UseSqlServer(appsettings.ConnectionString);
            //});
            
        }
    }
}
