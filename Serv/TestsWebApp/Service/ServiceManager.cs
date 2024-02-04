using AutoMapper;
using Entities.Models;
using Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Service.Interfaces;
using Shared.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<ITestService> _testService;
        private readonly Lazy<IQuestionService> _questionService;
        private readonly Lazy<IAuthenticationService> _authenticationService;

        public ServiceManager(IRepositoryManager repositoryManager,
                              IMapper mapper,
                              IDataShaper<TestDTO> dataShaperTest,
                              IDataShaper<QuestionDTO> dataShaperQuestion,
                              UserManager<User> userManager,
                              IConfiguration configuration)
        {
            _testService = new Lazy<ITestService>(() =>
            new TestService(repositoryManager, mapper, dataShaperTest, userManager));

            _questionService = new Lazy<IQuestionService>(() =>
            new QuestionService(repositoryManager, mapper, dataShaperQuestion));

            _authenticationService = new Lazy<IAuthenticationService>(() =>
            new AuthenticationService(mapper, userManager, configuration));
        }

        public ITestService TestService => _testService.Value;
        public IQuestionService QuestionService => _questionService.Value;
        public IAuthenticationService AuthenticationService => _authenticationService.Value;
    }
}
