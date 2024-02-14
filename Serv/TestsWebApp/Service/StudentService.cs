using AutoMapper;
using Entities.Exceptions;
using Entities.Models;
using Interfaces;
using Service.Interfaces;
using Shared.DataTransferObjects.StudentDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class StudentService : IStudentService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public StudentService(IRepositoryManager repository,
                              IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<StudentDTO> CreateStudent(Guid testId, StudentForCreationDTO studentForCreation, bool trackChanges)
        {
            var test = await _repository
                .Test
                .GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var studentEntity = _mapper.Map<Student>(studentForCreation);

            _repository
                .Student
                .CreateStudent(studentEntity);

            await _repository.SaveAsync();
            var studentDTO = _mapper.Map<StudentDTO>(studentEntity);
            return studentDTO;   
        }

        public async Task DeleteStudent(Guid testId, Guid studentId)
        {
            var test = await _repository
                .Test
                .GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var student = await _repository
                .Student
                .GetStudent(testId, studentId, trackChanges : false);

            if (student is null)
                throw new StudentNotFoundException(studentId);

            _repository.Student.DeleteStudent(student);
            await _repository.SaveAsync();
        }

        public async Task<List<StudentDTO>> GetAllStudents(Guid testId, bool trackChanges)
        {
            var test = await _repository
                 .Test
                 .GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var students = await _repository
                .Student
                .GetAllStudentsByTestId(testId, trackChanges);

            var studentsDTO = _mapper.Map<List<StudentDTO>>(students);
            return studentsDTO;
        }

        public async Task<StudentDTO> GetStudent(Guid testId, Guid studentId, bool trackChnges)
        {
            var test = await _repository
                .Test
                .GetTestAsync(testId, trackChanges: false);
            if (test is null)
                throw new TestNotFoundException(testId);

            var student = await _repository
                .Student
                .GetStudent(testId, studentId, trackChnges);
            if (student is null)
                throw new StudentNotFoundException(studentId);

            var studentDTO = _mapper.Map<StudentDTO>(student);
            return studentDTO;
        }
    }
}
