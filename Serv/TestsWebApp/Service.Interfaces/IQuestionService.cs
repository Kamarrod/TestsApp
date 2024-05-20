using Shared.DataTransferObjects.QuestionDTOs;
using Shared.RequestFeatures;
using System.Dynamic;

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
        Task<List<QuestionDTO>> CreateQuestionsWithGPT(string description, int count, Guid testId);
    }
}
