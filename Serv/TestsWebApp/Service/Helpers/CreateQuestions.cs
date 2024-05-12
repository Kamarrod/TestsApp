using Entities.ApiKeys;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Entities.Helpers;

namespace Service.Helpers
{
    public class CreateQuestions
    {
        public static async Task<string> CreateQuestionsWithGPT(string description, int count)
        {
            var api_key = new ApiKeys();
            
            var prompt = string.Format("Сгенерируй {0} вопросов по описанию:{1}. С ответом. Но результат верни в виде JSON объекта. Где questionText : текст вопроса, а answer: ответ на вопрос",
                                        count, description);

            List<Message> messages = new List<Message>();

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue($"Bearer", api_key.OpenAiAPI);
                var message = new Message() { Role = "user", Content = prompt };
                messages.Add(message);

                var requestData = new Request()
                {
                    ModelId = "gpt-3.5-turbo",
                    Messages = messages
                };
                using var response = await client.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", requestData);
                ResponseData? responseData = await response.Content.ReadFromJsonAsync<ResponseData>();
                var choices = responseData?.Choices ?? new List<Choice>();
                var choice = choices[0];
                var responseMessage = choice.Message;
                var responseText = responseMessage.Content.Trim();
                return responseText; //.ToLower() == "да." || responseText.ToLower() == "да";
            }
        }
    }
}
