using Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly Lazy<ITestRepository> _testRepository;
        private readonly Lazy<IQuestionRepository> _questionRepository;
        private readonly Lazy<IAnswerRepository> _answerRepository;
        private readonly Lazy<IStudentRepository> _studentRepository;
    
        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _testRepository = new Lazy<ITestRepository>(() => new TestRepository(repositoryContext));
            _questionRepository = new Lazy<IQuestionRepository>(() => new QuestionRepository(repositoryContext));
            _answerRepository = new Lazy<IAnswerRepository>(() => new AnswerRepository(repositoryContext));
            _studentRepository = new Lazy<IStudentRepository>(() => new StudentRepository(repositoryContext));
        }

        public ITestRepository Test => _testRepository.Value;
        public IQuestionRepository Question => _questionRepository.Value;
        public IAnswerRepository Answer => _answerRepository.Value;
        public IStudentRepository Student => _studentRepository.Value;
        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
