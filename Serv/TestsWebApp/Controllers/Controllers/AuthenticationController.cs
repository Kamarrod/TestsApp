﻿using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Shared.DataTransferObjects.AuthDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Controllers.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IServiceManager _service;
        public AuthenticationController(IServiceManager service) => _service = service;


        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDTO userForRegistration)
        {
            var result = await _service
                .AuthenticationService
                .RegisterUser(userForRegistration);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);

            }

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationDTO user)
        {
            if (!await _service.AuthenticationService.ValidateUser(user))
                return Unauthorized();
            var tokenDto = await _service.AuthenticationService.CreateToken(populateExp: true);

            return Ok(tokenDto);
        }
        
    }
}
