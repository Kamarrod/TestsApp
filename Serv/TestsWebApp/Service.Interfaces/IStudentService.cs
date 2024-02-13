using Shared.DataTransferObjects.StudentDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDTO>> GetAllStudents(Guid testId, bool trackChanges);
        Task<StudentDTO> GetStudent(Guid testId, Guid studentId, bool trackChnges);
        Task<StudentDTO> CreateStudent(Guid testId, StudentForCreationDTO studentForCreation, bool trackChanges);
        Task DeleteStudent(Guid testId, Guid studentId);
        
    }
}
