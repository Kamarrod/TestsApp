using Microsoft.AspNetCore.Identity;
using Shared.DataTransferObjects.AuthDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserForRegistrationDTO userForRegistration);
        Task<bool> ValidateUser(UserForAuthenticationDTO userForAuth);
        Task<TokenDTO> CreateToken(bool populateExp);
        Task<TokenDTO> RefreshToken(TokenDTO tokenDto);
    }
}
