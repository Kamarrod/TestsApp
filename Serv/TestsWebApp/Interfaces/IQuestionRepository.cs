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
        Task<PagedList<Question>> GetAllQuestionsAsync(QuestionParameters questionParameters, bool trackChanges);
        Task<Question> GetQuestiontAsync(Guid QuestionId, bool trackChanges);
        void CreateQuestion(Guid questionId, Question question);
        void DeleteQuestion(Question question);
    }
}
