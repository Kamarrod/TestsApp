using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects.StudentDTOs
{
    public record StudentForCreationDTO
    {
        [Required(ErrorMessage = "Name is a required field.")]
        [MaxLength(20, ErrorMessage = "Name max length is 20 symbols ")]
        public string Name { get; init; }
        public Guid TestId { get; init; }
        public DateTime StartTime { get; init; }
        public DateTime EndTime { get; init; }
    }
}
