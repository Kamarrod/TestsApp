using AutoMapper;
using Entities.Models;
using Interfaces;
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

        public ServiceManager(IRepositoryManager repositoryManager,
                              IMapper mapper,
                              IDataShaper<TestDTO> dataShaperTest)
        {
            _testService = new Lazy<ITestService>(() =>
            new TestService(repositoryManager, mapper, dataShaperTest));
        }

        public ITestService TestService => _testService.Value;
    }
}
