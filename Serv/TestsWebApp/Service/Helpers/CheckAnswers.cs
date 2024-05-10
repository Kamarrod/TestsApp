using Entities.ApiKeys;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Entities.Helpers;

namespace Service.Helpers
{
    public class CheckAnswers
    {
        public static async Task<bool> CheckAnswerWithGPT(string answer, string authorAnswer, string question)
        {
            var api_key = new ApiKeys();

            var prompt = string.Format("Сравните ответ пользователя на вопрос курса с правильным ответом, установленным автором. Если ответ пользователя подходит по смыслу не важно сколько слов в ответе гланое смысл, выведите 'Да', если нет - 'Нет'. Вопрос:{2} ? Ответ автора : {1}. Ответ пользователя: {0}. Если вопрос это математическое выражение, или формула, или число, то сходство должно быть полным",
                                      answer, authorAnswer, question);
            //var prompt = string.Format("Придумай 10 вопросов на тему машинного обучения, с ответом",
              //                          answer, authorAnswer, question);

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
                return responseText.ToLower() == "да." || responseText.ToLower() == "да";
            }
        }
    }
}
