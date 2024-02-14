using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Answer
    {
        public Guid Id { get; set; }
        [MaxLength(50)]
        [Required(ErrorMessage = "Answer is a required field.")]
        public string UserAnswer { get; set; }
        [ForeignKey(nameof(Question))]
        public Guid QuestionId { get; set; }
        [ForeignKey(nameof(Student))]
        public Guid StudentId { get; set;  }

    }
}
