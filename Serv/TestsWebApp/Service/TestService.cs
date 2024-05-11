using AutoMapper;
using Entities.Exceptions;
using Entities.Models;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Service.Interfaces;
using Shared.RequestFeatures;
using System.Dynamic;
using Microsoft.AspNetCore.Mvc;
using Shared.DataTransferObjects.TestDTOs;

namespace Service
{
    public sealed class TestService : ITestService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IDataShaper<TestDTO> _dataShaper;
        private readonly UserManager<User> _userManager;

        public TestService(IRepositoryManager repositoryManager,
                           IMapper mapper,
                           IDataShaper<TestDTO> dataShaper,
                           UserManager<User> userManager)
        {
            _repository = repositoryManager;
            _mapper = mapper;
            _dataShaper = dataShaper;
            _userManager = userManager;
        }

        public async Task<(IEnumerable<ExpandoObject> tests, MetaData metaData)> GetAllTestsAsync
            (TestParameters testParameters, string userId, bool trackChanges)
        {
            var testWithMetaData = await _repository
                .Test
                .GetAllTestsAsync(testParameters, trackChanges);

            var testDTO = _mapper.Map<IEnumerable<TestDTO>>(testWithMetaData);
            var shapedTests = testDTO
                .Where(x => x.AuthorId.Equals(userId))
                .ToList();
            var shapeData = _dataShaper.ShapeData(shapedTests, testParameters.Fields);
            return (tests : shapeData,  metaData: testWithMetaData.MetaData);
        }

        public async Task<TestDTO> GetTestAsync(Guid testId, bool trackChanges)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges);
            if (test is null)
                throw new TestNotFoundException(testId);

            var testDTO = _mapper.Map<TestDTO>(test);
            return testDTO;
        }

        public async Task<TestDTO> CreateTestAsync(TestForCreationDTO testForCreation, bool trackChanges, string currentUserId)
        {
            var testEntity = _mapper.Map<Test>(testForCreation);
            testEntity.AuthorId = currentUserId;
            _repository.Test.CreateTest(testEntity);
            await _repository.SaveAsync();

            var testDTO = _mapper.Map<TestDTO>(testEntity);
            return testDTO;
        }

        public async Task DeleteTestAsync(Guid testId, bool trackChanges, string currentUserId)
        {
             var test =  await _repository.Test.GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);
            if (currentUserId != test.AuthorId)
                throw new UserNotAuthorException(currentUserId);
            _repository.Test.DeleteTest(test);
            await _repository.SaveAsync();
        }

        public async Task UpdateTestAsync(Guid testId, TestForUpdateDTO testForUpdate, bool trackChanges, string currentUserId)
        {
            var test = await _repository.Test.GetTestAsync(testId, trackChanges : false);
            if (test is null)
                throw new TestNotFoundException(testId);
            if (currentUserId != test.AuthorId)
                throw new UserNotAuthorException(currentUserId);
            _mapper.Map(testForUpdate, test);
            await _repository.SaveAsync();
        }
    }
}
