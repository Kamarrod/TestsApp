using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Shared.DataTransferObjects.AnswerDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Controllers.Controllers
{
    [Route("api/tests/{testId}/student/{studentId}/answers")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IServiceManager _service;

        public AnswerController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStudentAnswers(Guid testId, Guid studentId)
        {
            var answers = await _service
                .AnswerService
                .GetAllStudentAnswers(testId, studentId, trackChanges: false);

            return Ok(answers);
        }

        [HttpGet("{questionId:guid}")]
        public async Task<IActionResult> GetStudentAnswerOnQuestion(Guid questionId, Guid studentId)
        {
            var answer = await _service
                .AnswerService
                .GetStudentAnswerOnQuestion(studentId, questionId, trackChanges:false);
            return Ok(answer);
        }

        [HttpPost("{questionId:guid}")]
        public async Task<IActionResult> CreateAnswer(Guid questionId, Guid studentId, [FromBody] AnswerForCreationDTO answerForCreation)
        {
            if (answerForCreation is null)
                return BadRequest("AnswerForCreationDTO object is null");

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var answer = await _service
                .AnswerService
                .CreateAnswer(studentId, questionId, answerForCreation, trackChanges:false);

            return NoContent();
        }

        [HttpDelete("{questionId:guid}")]
        public async Task<IActionResult> DeleteAnswer(Guid questionId, Guid studentId)
        {
            await _service
                .AnswerService
                .DeleteAnswer(studentId, questionId, trackChanges : false);
            return NoContent();
        }
    }
}
