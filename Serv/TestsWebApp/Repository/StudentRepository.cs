using Entities.Models;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public  class StudentRepository : RepositoryBase<Student>, IStudentRepository
    {
        public StudentRepository(RepositoryContext repositoryContext)
        : base(repositoryContext) { }

        public void DeleteStudent(Student student) => Delete(student);
        public void CreateStudent(Student student) => Create(student);

        public async Task<List<Student>> GetAllStudentsByTestId(Guid testId, bool trackChanges) => await
                FindAll(trackChanges)
                .Where(x => x.TestId.Equals(testId))
                .ToListAsync(); 
        public async Task<Student> GetStudent(Guid testId, Guid studentId, bool trackChanges) => await
            FindByCondition(x => x.TestId.Equals(testId) && x.Id.Equals(studentId), trackChanges)
            .SingleOrDefaultAsync();
    }
}
