using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Question
    {
        [Column("QuestionId")]
        public Guid Id { get; set; }
        [Required(ErrorMessage = "Question Text is a required field.")]
        public string QuestionText { get; set; }
        [Required(ErrorMessage = "Question Answer is a required field.")]
        public string Answer { get; set; }

        public int NumberQuestion { get; set; }

        public int Cost { get; set; }

        [ForeignKey(nameof(Test))]
        public Guid TestId { get; set; }

    }
}
