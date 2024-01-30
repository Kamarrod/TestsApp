using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public sealed class TestNotFoundException : NotFoundException
    {
        public TestNotFoundException(Guid testId)
            : base($"The test with id: {testId} doesn't exist in the database.")
        { }
    }
}
