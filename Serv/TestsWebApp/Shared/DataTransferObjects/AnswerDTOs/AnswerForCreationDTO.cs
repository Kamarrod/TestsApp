﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects.AnswerDTOs
{
    public record AnswerForCreationDTO
    {
        [MaxLength(50)]
        [Required(ErrorMessage = "Answer is a required field.")]
        public string UserAnswer { get; init; }    
        public Guid QuestionId { get; init; }
        public Guid StudentId { get; init; }
    }
}
