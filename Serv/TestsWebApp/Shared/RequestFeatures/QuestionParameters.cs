using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.RequestFeatures
{
    public class QuestionParameters : RequestParameters
    {
        public QuestionParameters() => OrderBy = "number";
        public string? SearchTerm { get; set; }
    }
}
