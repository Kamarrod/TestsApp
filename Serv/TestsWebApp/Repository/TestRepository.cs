using Entities.Models;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Repository.Extensions;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class TestRepository : RepositoryBase<Test>, ITestRepository
    {
        public TestRepository(RepositoryContext repositoryContext)
            : base(repositoryContext) { }
        public void CreateTest(Test test) => Create(test);

        public void DeleteTest(Test test) => Delete(test);

        public async Task<PagedList<Test>> GetAllTestsAsync(TestParameters testParameters, bool trackChanges)
        {
            var tests = await
                FindAll(trackChanges)
                .Search(testParameters.SearchTerm)
                .Sort(testParameters.OrderBy)
                .ToListAsync();

            return PagedList<Test>.ToPagedList(tests, testParameters.PageNumber, testParameters.PageSize);
        }

        public async Task<Test> GetTestAsync(Guid testId, bool trackChanges) => await
            FindByCondition(x => x.Id.Equals(testId), trackChanges)
            .SingleOrDefaultAsync();
    }
}
