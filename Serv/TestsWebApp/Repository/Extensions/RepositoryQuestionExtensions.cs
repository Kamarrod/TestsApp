using Entities.Models;
using Repository.Extensions.Utility;
using System.Linq.Dynamic.Core;

namespace Repository.Extensions
{
    public static class RepositoryQuestionExtensions
    {
        public static IQueryable<Question> Search(this IQueryable<Question> questions, string searchTerm)
        {
            if(string.IsNullOrWhiteSpace(searchTerm))
                return questions;
            var lowerCaseTerm = searchTerm.Trim().ToLower();
            return questions.Where(x =>
            x.QuestionText
            .ToLower()
            .Contains(lowerCaseTerm));
        }

        public static IQueryable<Question> Sort(this IQueryable<Question>  questions, string orderByQueryString)
        {
            if (string.IsNullOrWhiteSpace(orderByQueryString))
                return questions.OrderByDescending(x => x.NumberQuestion);
            var orderQuery = OrderQueryBuilder<Test>.CreateOrderQuery<Test>(orderByQueryString);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return questions.OrderBy(x => x.NumberQuestion);

            return questions.OrderBy(orderQuery);
        }
    }
}
