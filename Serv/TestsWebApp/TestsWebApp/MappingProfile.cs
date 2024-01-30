using AutoMapper;
using Entities.Models;
using Shared.DataTransferObjects;

namespace TestsWebApp
{
    public class MappingProfile: Profile
    {
        public MappingProfile() 
        {
            CreateMap<Test, TestDTO>();
            CreateMap<TestForCreationDTO, Test>();
            CreateMap<TestForUpdateDTO, Test>();
            CreateMap<TestForUpdateDTO, Test>().ReverseMap();
        }
    }
}
