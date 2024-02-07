﻿using AutoMapper;
using Entities.Models;
using Shared.DataTransferObjects.AnswerDTOs;
using Shared.DataTransferObjects.AuthDTOs;
using Shared.DataTransferObjects.QuestionDTOs;
using Shared.DataTransferObjects.TestDTOs;

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
            CreateMap<Question, QuestionDTO>();
            CreateMap<QuestionForCreationDTO, Question>();
            CreateMap<QuestionForUpdateDTO, Question>();
            CreateMap<QuestionForUpdateDTO, Question>().ReverseMap();
            CreateMap<UserForRegistrationDTO, User>();
            CreateMap<Answer, AnswerDTO>();
            CreateMap<AnswerForCreationDTO, Answer>();
        }
    }
}
