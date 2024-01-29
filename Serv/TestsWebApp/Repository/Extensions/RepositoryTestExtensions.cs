using Entities.Models;
using Repository.Extensions.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Extensions
{
    public static class RepositoryTestExtensions
    {
        public static IQueryable<Test> Search(this IQueryable<Test> tests, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) 
                return tests;
            var lowerCaseTerm = searchTerm.Trim().ToLower();
            return tests.Where(x => 
            x.Name
            .ToLower()
            .Contains(lowerCaseTerm));
        }

        public static IQueryable<Test> Sort(this IQueryable<Test> tests, string orderByQueryString)
        {
            if (string.IsNullOrWhiteSpace(orderByQueryString))
                return tests.OrderByDescending(x => x.CreateTime);
            var orderQuery = OrderQueryBuilder<Test>.CreateOrderQuery<Test>(orderByQueryString);
        
            if (string.IsNullOrWhiteSpace(orderQuery))
                return tests.OrderBy(x => x.CreateTime);

            return tests.OrderBy(orderQuery);
        }
    }
}
