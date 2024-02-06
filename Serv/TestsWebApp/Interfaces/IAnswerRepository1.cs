using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IAnswerRepository1
    {
        Task<List<Answer>> GetAllStudentsByTestId(Guid testId, bool trackChanges);
        Task<Answer> GetAnswerOnQuestion(Guid testId, Guid questiontId, bool trackChanges);
        void CreateAnswer(Answer answer);
        void DeleteAnswer(Answer answer);
    }
}
