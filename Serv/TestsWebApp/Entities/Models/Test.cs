using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Test
    {
        [Column("TestId")]

        public Guid Id { get; set; }
        [MaxLength(30, ErrorMessage = "Длинна названия не должна превышать 30 символов")]
        [Required(ErrorMessage = "Test name is a required field.")]
        public string Name { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime CloseTime { get; set; }

        public bool HaveTimeLimit { get; set; }
        // в минутах
        [Range(0, 2880, ErrorMessage = "Лимит по времени должен быть не более 2880 минут(48 часов) и не менее 0")]
        public int? TimeLimit { get; set; }

        //[ForeignKey(nameof(User))]
        public string AuthorId { get; set; }

    }
}
