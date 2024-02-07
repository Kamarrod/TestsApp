using Entities.Models;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class AnswerRepository : RepositoryBase<Answer>, IAnswerRepository
    {
        public AnswerRepository(RepositoryContext repositoryContext)
            :base(repositoryContext) { }

        public async Task<List<Answer>> GetAllStudentsAnswers(Guid testId, Guid studentId, bool trackChanges) => await
            FindAll(trackChanges)
            .Where(x => x.StudetnId.Equals(studentId))
            .ToListAsync();

        public async Task<Answer> GetAnswerOnQuestion(Guid questiontId, Guid studentId, bool trackChanges) => await
            FindByCondition(x => x.StudetnId.Equals(studentId) && x.QuestionId.Equals(questiontId), trackChanges)
            .SingleOrDefaultAsync();

        public void CreateAnswer(Answer answer) => Create(answer);
        public void DeleteAnswer(Answer answer) => Delete(answer);

    }
}
