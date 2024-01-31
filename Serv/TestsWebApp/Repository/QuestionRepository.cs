using Entities.Models;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Repository.Extensions;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class QuestionRepository : RepositoryBase<Question>, IQuestionRepository
    {
        public QuestionRepository(RepositoryContext repositoryContext)
        : base(repositoryContext){ }

        public void CreateQuestion(Guid testId, Question question)
        {
            question.TestId = testId;
            Create(question);
        }
        public void DeleteQuestion(Question question) => Delete(question);
        public async Task<PagedList<Question>> GetAllQuestionsAsync(QuestionParameters questionParameters, bool trackChanges)
        {
            var questions = await
                FindAll(trackChanges)
                .Search(questionParameters.SearchTerm)
                .Sort(questionParameters.OrderBy)
                .ToListAsync();

            return PagedList<Question>.ToPagedList(questions, questionParameters.PageNumber, questionParameters.PageSize);
        }

        public async Task<Question> GetQuestionAsync(Guid QuestionId, bool trackChanges) => await
            FindByCondition(x => x.Id.Equals(QuestionId), trackChanges)
            .SingleOrDefaultAsync();
    }
}
