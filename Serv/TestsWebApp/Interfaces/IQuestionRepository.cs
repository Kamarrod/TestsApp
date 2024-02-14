using Entities.Models;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IQuestionRepository
    {
        Task<PagedList<Question>> GetAllByTestQuestionsAsync(Guid testId,QuestionParameters questionParameters, bool trackChanges);
        Task<Question> GetQuestionAsync(Guid QuestionId, bool trackChanges);
        void CreateQuestion(Guid testId, Question question);
        void DeleteQuestion(Question question);
    }
}
