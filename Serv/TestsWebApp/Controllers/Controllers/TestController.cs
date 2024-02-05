using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System.Security.Claims;

namespace Controllers.Controllers
{
    [Route("api/tests")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IServiceManager _service;

        public TestController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetTests([FromQuery] TestParameters testParameters)
        {
            var pagedResult = await _service
                .TestService
                .GetAllTestsAsync(testParameters, trackChanges: false);
            return Ok(pagedResult.tests);
        }

        [HttpGet("{id:guid}", Name = "TestById")]
        public async Task<IActionResult> GetTest(Guid id)
        {
            var test = await _service.TestService.GetTestAsync(id, trackChanges : false);
            return Ok(test);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTest([FromBody] TestForCreationDTO testForCreation)
        {
            if (testForCreation is null)
                return BadRequest("TestForCreationDTO object is null");
            var createTest = await _service.TestService.CreateTestAsync(testForCreation, trackChanges: false, GetCurrentUserAsync());
            return CreatedAtRoute("TestById", new { id = createTest.Id}, createTest);
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> DeleteTest(Guid id)
        {
            var currentUserId = GetCurrentUserAsync();
             await _service.TestService.DeleteTestAsync(id, trackChanges: false, currentUserId);
            return NoContent();
        }

        [HttpPut("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> UpdateTest(Guid id, [FromBody] TestForUpdateDTO testForUpdate)
        {
            if (testForUpdate is null)
                return BadRequest("TestForUpdateDTO object is null");
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);
            string currentUserId = GetCurrentUserAsync();
            await _service.TestService.UpdateTestAsync(id, testForUpdate, trackChanges : true, currentUserId);
            return NoContent();
        }

        private string GetCurrentUserAsync() => User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
