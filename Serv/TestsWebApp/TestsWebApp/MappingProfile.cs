﻿using AutoMapper;
using Entities.Models;
using Shared.DataTransferObjects.AnswerDTOs;
using Shared.DataTransferObjects.AuthDTOs;
using Shared.DataTransferObjects.QuestionDTOs;
using Shared.DataTransferObjects.StudentDTOs;
using Shared.DataTransferObjects.TestDTOs;

namespace TestsWebApp
{
    public class MappingProfile: Profile
    {
        public MappingProfile() 
        {
            CreateMap<Test, TestDTO>();
            CreateMap<TestForCreationDTO, Test>();
                //.ForMember(dest => dest.CreateTime,
                  //  opt => opt.MapFrom(src => src.CreateTime.ToFileTimeUtc()))
                //.ForMember(dest => dest.CloseTime,
                  //  opt => opt.MapFrom(src => src.CloseTime.ToFileTimeUtc()) );
            CreateMap<TestForUpdateDTO, Test>();
            CreateMap<TestForUpdateDTO, Test>().ReverseMap();
            CreateMap<Question, QuestionDTO>();
            CreateMap<QuestionForCreationDTO, Question>();
            CreateMap<QuestionForUpdateDTO, Question>();
            CreateMap<QuestionForUpdateDTO, Question>().ReverseMap();
            CreateMap<UserForRegistrationDTO, User>();
            CreateMap<Answer, AnswerDTO>();
            CreateMap<AnswerForCreationDTO, Answer>();
            CreateMap<Student, StudentDTO>();
            CreateMap<StudentForCreationDTO, Student>();
        }
    }
}
