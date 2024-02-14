using AutoMapper;
using Entities.Exceptions;
using Entities.Models;
using Interfaces;
using Service.Interfaces;
using Shared.DataTransferObjects.QuestionDTOs;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public sealed class QuestionService : IQuestionService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IDataShaper<QuestionDTO> _dataShaper;
        public QuestionService(IRepositoryManager repository,
                               IMapper mapper,
                               IDataShaper<QuestionDTO> dataShaper)
        {
            _repository = repository;
            _mapper = mapper;
            _dataShaper = dataShaper;
        }

        public async Task<(IEnumerable<ExpandoObject> questions, MetaData metaData)> GetAllQuestionsAsync
            (Guid testId, QuestionParameters questionParameters, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges : false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var questionWithMetaData = await _repository
                .Question
                .GetAllByTestQuestionsAsync(testId, questionParameters, trackChanges);

            var questionDTO = _mapper.Map<IEnumerable<QuestionDTO>>(questionWithMetaData);
            var shapeData = _dataShaper.ShapeData(questionDTO, questionParameters.Fields);
            return (questions: shapeData, questionWithMetaData.MetaData);
        }

        public async Task<QuestionDTO> GetQuestionAsync(Guid testId, Guid quesinId, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var question = await _repository.Question.GetQuestionAsync(quesinId, trackChanges);
            if (question is null)
                throw new QuestionNotFoundException(quesinId);
            var questionDTO = _mapper.Map<QuestionDTO>(question);
            return questionDTO;
        }

        public async Task<QuestionDTO> CreateQuestionAsync(Guid testId, QuestionForCreationDTO questionForCreation, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var questionEntity = _mapper.Map<Question>(questionForCreation);
            _repository.Question.CreateQuestion(testId, questionEntity);
            await _repository.SaveAsync();

            var questionDTO = _mapper.Map<QuestionDTO>(questionEntity);
            return questionDTO;
        }

        public async Task DeleteQuestionAsync(Guid testId, Guid questionId, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var question = await _repository.Question.GetQuestionAsync(questionId, trackChanges);
            if(question is null)
                throw new QuestionNotFoundException(questionId);

            _repository.Question.DeleteQuestion(question);
            await _repository.SaveAsync();
        }
        public async Task UpdateQuestionAsync(Guid testId, Guid questionId, QuestionForUpdateDTO questionForUpdate,bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);
            var question = await _repository.Question.GetQuestionAsync(questionId, trackChanges);
            if (question is null)
                throw new QuestionNotFoundException(questionId);
            _mapper.Map(questionForUpdate, question);
            await _repository.SaveAsync();
        }
    }
}
