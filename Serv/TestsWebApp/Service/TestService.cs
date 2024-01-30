using AutoMapper;
using Entities.Exceptions;
using Entities.Models;
using Interfaces;
using Service.Interfaces;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System.Dynamic;

namespace Service
{
    public sealed class TestService : ITestService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IDataShaper<TestDTO> _dataShaper;

        public TestService(IRepositoryManager repositoryManager,
                           IMapper mapper,
                           IDataShaper<TestDTO> dataShaper)
        {
            _repository = repositoryManager;
            _mapper = mapper;
            _dataShaper = dataShaper;
        }

        public async Task<(IEnumerable<ExpandoObject> tests, MetaData metaData)> GetAllTestsAsync
            (TestParameters testParameters, bool trackChanges)
        {
            var testWithMetaData = await _repository
                .Test
                .GetAllTestsAsync(testParameters, trackChanges);

            var testDTO = _mapper.Map<IEnumerable<TestDTO>>(testWithMetaData);
            var shapeData = _dataShaper.ShapeData(testDTO, testParameters.Fields);
            return (tests : shapeData, metaData: testWithMetaData.MetaData);
        }

        public async Task<TestDTO> GetTestAsync(Guid testId, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges);
            if (test is null)
                throw new TestNotFoundException(testId);

            var testDTO = _mapper.Map<TestDTO>(test);
            return testDTO;
        }

        public async Task<TestDTO> CreateTestAsync(TestForCreationDTO testForCreation, bool trackChanges)
        {
            var testEntity = _mapper.Map<Test>(testForCreation);
            _repository.Test.CreateTest(testEntity);
            await _repository.SaveAsync();

            var testDTO = _mapper.Map<TestDTO>(testEntity);
            return testDTO;
        }

        public async Task DeleteTestAsync(Guid testId, bool trackChanges)
        {
            var test =  await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            _repository.Test.DeleteTest(test);
            await _repository.SaveAsync();
        }

        public async Task UpdateTestAsync(Guid testId, TestForUpdateDTO testForUpdate, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges : false);
            if (test is null)
                throw new TestNotFoundException(testId);

            _mapper.Map(testForUpdate, test);
            await _repository.SaveAsync();
        }
    }
}
