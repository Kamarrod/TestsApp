using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models;

public class QuestionsContainer
{
    public List<GeneratedQuestions> questions { get; set; }
}
public class GeneratedQuestions
{
    public string questionText { get; set; }
    public string answer { get; set; }
}
