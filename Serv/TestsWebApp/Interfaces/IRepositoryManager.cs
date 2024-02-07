using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IRepositoryManager
    {
        ITestRepository Test { get; }
        IQuestionRepository Question { get; }
        IAnswerRepository Answer { get; }
        IStudentRepository Student { get; }
        Task SaveAsync();
    }
}
