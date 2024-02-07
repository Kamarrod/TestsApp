using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IAnswerRepository
    {
        Task<List<Answer>> GetAllStudentsAnswers(Guid testId, Guid studentId, bool trackChanges);
        Task<Answer> GetAnswerOnQuestion(Guid questiontId, Guid studentId, bool trackChanges);
        void CreateAnswer(Answer answer);
        void DeleteAnswer(Answer answer);
    }
}
