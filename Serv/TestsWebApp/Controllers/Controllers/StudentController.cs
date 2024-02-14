using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Shared.DataTransferObjects.StudentDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Controllers.Controllers
{
    [Route("api/tests/{testId}/students")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IServiceManager _service;

        public StudentController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllSolvedTestStudents(Guid testId)
        {
            var test = await _service
                .TestService
                .GetTestAsync(testId, trackChanges: false);

            if (test.AuthorId != GetCurrentUserAsync())
                return BadRequest();

            var students = await _service
                .StudentService
                .GetAllStudents(testId, trackChanges: false);
            return Ok(students);
        }

        [HttpGet("{id:guid}", Name = "StudentById")]
        [Authorize]
        public async Task<IActionResult> GetStudent(Guid id, Guid testId)
        {
            var student = await _service
                .StudentService
                .GetStudent(testId, id, trackChnges:false);
            return Ok(student);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent(Guid testId, [FromBody] StudentForCreationDTO studentForCreation)
        {
            if (studentForCreation is null)
                return BadRequest("StudentForCreationDTO object is null");
            var student = await _service
                .StudentService
                .CreateStudent(testId, studentForCreation, trackChanges:false);
            return CreatedAtRoute("StudentById",new {id = student.Id}, student);
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> DeleteStudent(Guid id, Guid testId)
        {
            await _service.StudentService.DeleteStudent(testId, id);
            return NoContent();
        }

        private string GetCurrentUserAsync() => User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
