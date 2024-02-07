using AutoMapper;
using Entities.Exceptions;
using Entities.Models;
using Interfaces;
using Service.Interfaces;
using Shared.DataTransferObjects.AnswerDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class AnswerService : IAnswerService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public AnswerService(IRepositoryManager repository,
                             IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<AnswerDTO> CreateAnswer(Guid studentId, Guid questionId, AnswerForCreationDTO answerForCreation, bool trackChanges)
        {
            var question = await _repository.Question.GetQuestionAsync(questionId, trackChanges: false);
            if (question is null)
                throw new QuestionNotFoundException(questionId);

            var student = await _repository.Student.GetStudent(question.TestId, studentId, trackChanges: false);
            if (student is null)
                throw new StudentNotFoundException(studentId);

            var answerEntity = _mapper.Map<Answer>(answerForCreation);
            _repository.Answer.CreateAnswer(answerEntity);
            await _repository.SaveAsync();

            var AnswerDTO = _mapper.Map<AnswerDTO>(answerEntity);
            return AnswerDTO;
        }

        public async Task DeleteAnswer(Guid studentId, Guid questionId, bool trackChanges)
        {
            var question = await _repository.Question.GetQuestionAsync(questionId, trackChanges: false);
            if (question is null)
                throw new QuestionNotFoundException(questionId);

            var student = await _repository.Student.GetStudent(question.TestId, studentId, trackChanges: false);
            if (student is null)
                throw new StudentNotFoundException(studentId);

            var answer = await _repository.Answer.GetAnswerOnQuestion(questionId, studentId, trackChanges);

            _repository.Answer.DeleteAnswer(answer);
            await _repository.SaveAsync();
        }

        public async Task<List<AnswerDTO>> GetAllStudentAnswers(Guid testId, Guid studentId, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var student = await _repository.Student.GetStudent(testId, studentId, trackChanges: false);
            if (student is null)
                throw new StudentNotFoundException(studentId);

            var answers = await _repository.Answer.GetAllStudentsAnswers(testId, studentId, trackChanges);
            var answersDTO = _mapper.Map<List<AnswerDTO>>(answers);
            return answersDTO;
        }

        public async Task<AnswerDTO> GetStudentAnswerOnQuestion(Guid studentId, Guid questionId, bool trackChanges)
        {
            var question = await _repository.Question.GetQuestionAsync(questionId, trackChanges: false);
            if (question is null)
                throw new QuestionNotFoundException(questionId);

            var student = await _repository.Student.GetStudent(question.TestId, studentId, trackChanges: false);
            if (student is null)
                throw new StudentNotFoundException(studentId);

            var answer = await _repository.Answer.GetAnswerOnQuestion(questionId, studentId, trackChanges);
            var answerDTO = _mapper.Map<AnswerDTO>(answer);
            return answerDTO;
        }
    }
}
