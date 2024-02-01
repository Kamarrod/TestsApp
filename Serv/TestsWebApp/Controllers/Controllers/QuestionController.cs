using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Controllers.Controllers
{
    [Route("api/tests/{testId}/questions")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IServiceManager _service;

        public QuestionController(IServiceManager service) =>
            _service = service;

        [HttpGet]
        public async Task<IActionResult> GetQuestions(Guid testId, [FromQuery] QuestionParameters questionParameters)
        {
            var pagedResult = await _service
                .QuestionService
                .GetAllQuestionsAsync(testId, questionParameters, trackChanges: false);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagedResult.metaData));

            return Ok(pagedResult.questions);
        }

        [HttpGet("{id:guid}", Name = "GetQuestionById")]
        public async Task<IActionResult> GetQuestion(Guid id, Guid testId)
        {
            var question = await _service
                .QuestionService
                .GetQuestionAsync(testId, id, trackChanges : false);
            return Ok(question);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateQuestion(Guid testId, [FromBody] QuestionForCreationDTO questionForCreation)
        {
            if (questionForCreation is null)
                return BadRequest("QuestionForCreationDTO object is null");

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var question = await _service
                .QuestionService
                .CreateQuestionAsync(testId, questionForCreation, trackChanges : false);
            return CreatedAtRoute("GetQuestionById", new {testId, Id = question.Id}, question);
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> DeleteQuestion(Guid testId, Guid id)
        {
            await _service.QuestionService.DeleteQuestionAsync(testId, id, trackChanges:false);
            return NoContent();
        }

        [HttpPut("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> UpdateQuestion(Guid testId, Guid id, [FromBody] QuestionForUpdateDTO questionForUpdate)
        {
            if (questionForUpdate is null)
                return BadRequest("QuestionForUpdateDTO object is null");

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            await _service.QuestionService.UpdateQuestionAsync(testId, id, questionForUpdate, trackChanges : true);
            return NoContent();
        }
    }
}
