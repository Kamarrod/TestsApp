using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public sealed class UserNotAuthorException : BadRequestException
    {
        public UserNotAuthorException(string userId) : 
            base($"The user id: {userId} does not match the text author id.")
        {
        }
    }
}
