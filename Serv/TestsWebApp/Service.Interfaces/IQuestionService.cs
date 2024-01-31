using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IQuestionService
    {
        Task<(IEnumerable<ExpandoObject> questions, MetaData metaData)> GetAllQuestionsAsync
            (Guid testId, QuestionParameters questionParameters, bool trackChanges);
        Task<QuestionDTO> GetQuestionAsync(Guid testId, Guid questionId, bool trackChanges);
        Task<QuestionDTO> CreateQuestionAsync(Guid testId, QuestionForCreationDTO questionForCreation, bool trackChanges);
        Task UpdateQuestionAsync(Guid testId, Guid questionId, QuestionForUpdateDTO questionForUpdate, bool trackChanges);
        Task DeleteQuestionAsync(Guid testId, Guid questionId, bool trackChanges);
    }
}
