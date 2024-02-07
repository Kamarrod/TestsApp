using Entities.Models;
using Shared.DataTransferObjects.AnswerDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IAnswerService
    {
        Task<List<AnswerDTO>> GetAllStudentAnswers(Guid testId, Guid studentId, bool trackChanges);
        Task<AnswerDTO> GetStudentAnswerOnQuestion(Guid studetnId, Guid questionId, bool trackChanges);
        Task<AnswerDTO> CreateAnswer(Guid studentId, Guid questionId, AnswerForCreationDTO answerForCreation, bool trackChanges);
        Task DeleteAnswer(Guid studentId, Guid QuestionId, bool trackChanges);
    }
}
