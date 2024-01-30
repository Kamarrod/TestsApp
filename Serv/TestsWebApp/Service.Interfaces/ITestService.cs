using Entities.Models;
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
    public interface ITestService
    {
        Task<(IEnumerable<ExpandoObject> tests, MetaData metaData)> GetAllTestsAsync
            (TestParameters testParameters, bool trackChanges);
        Task<TestDTO> GetTestAsync(Guid testId, bool trackChanges);
        Task<TestDTO> CreateTestAsync(TestForCreationDTO testForCreation, bool trackChanges);
        Task UpdateTestAsync(Guid testId, TestForUpdateDTO testForUpdate, bool trackChanges);
        Task DeleteTestAsync(Guid testId, bool trackChanges);
    }
}
