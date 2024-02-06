using Entities.Models;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IStudentRepository
    {
        Task<List<Student>> GetAllStudentsByTestId(Guid testId, bool trackChanges);
        Task<Student> GetStudent(Guid testId, Guid studentId, bool trackChanges);
        void CreateStudent(Student student);
        void DeleteStudent(Student student);
    }
}
