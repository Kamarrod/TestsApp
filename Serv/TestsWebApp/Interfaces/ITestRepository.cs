using Entities.Models;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface ITestRepository
    {
        Task<PagedList<Test>> GetAllTestsAsync(TestParameters testParameters, bool trackChanges);
        Task<Test> GetTestAsync(Guid testId, bool trackChanges);
        void CreateTest(Test test);
        void DeleteTest(Test test);
    }
}
