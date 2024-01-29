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
    
        public RepositoryManager(RepositoryContext repositoryContext, Lazy<ITestRepository> testRepository, Lazy<IQuestionRepository> questionRepository)
        {
            _repositoryContext = repositoryContext;
            _testRepository = testRepository;
            _questionRepository = questionRepository;
        }

        public ITestRepository Test => _testRepository.Value;
        public IQuestionRepository Question => _questionRepository.Value;
        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
