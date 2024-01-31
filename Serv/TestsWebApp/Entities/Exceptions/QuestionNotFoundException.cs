using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public sealed class QuestionNotFoundException: NotFoundException
    {
        public QuestionNotFoundException(Guid questionId) 
            : base($"The question with id: {questionId} doesn't exist in the database.") { }
    }
}
