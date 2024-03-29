﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects.QuestionDTOs
{
    public record QuestionForManipulationDTO
    {
        public string QuestionText { get; init; }
        public string Answer { get; init; }
        public int NumberQuestion { get; init; }
        public int Cost { get; init; }
    }
}
