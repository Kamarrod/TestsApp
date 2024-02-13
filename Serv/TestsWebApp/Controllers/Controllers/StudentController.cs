using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Controllers.Controllers
{
    [Route("api/tests/{testId}/student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IServiceManager _service;

        public StudentController(IServiceManager service)
        {
            _service = service;
        }

        //[HttpGet("{guid:id}")]
        //[Authorize]
        //public async Task<IActionResult> GetStudents(Guid id)
        //{

        //}
    }
}
