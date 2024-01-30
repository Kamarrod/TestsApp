using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record TestForCreationDTO : TestForManipulationDTO 
    {
        public string Name { get; init; }
        public DateTime CreateTime { get; init; }
        public DateTime CloseTime { get; init; }
        public bool? HaveTimeLimit { get; init; }
        public int? TimeLimit { get; init; }
    }
}
