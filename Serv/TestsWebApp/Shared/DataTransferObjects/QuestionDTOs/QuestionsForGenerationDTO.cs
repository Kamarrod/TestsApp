namespace Shared.DataTransferObjects.QuestionDTOs;

public record QuestionsForGenerationDTO
{
    public string Description { get; init; }
    public int Count { get; init; }
};