using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.RequestFeatures
{
    public class TestParameters : RequestParameters
    {
        public TestParameters() => OrderBy = "CreateTime";
        public string? SearchTerm { get; set; }
    }
}
