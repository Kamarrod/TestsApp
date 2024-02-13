using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace Ozon
{
    public class Folder
    {
        public string dir { get; set; }
        public string[] files { get; set; }
        public Folder[] folders { get; set; }
    }
    class Ozon
    {
        //public static List<int> NN = 

        public static int GetCount(Folder folder, bool hack)
        {
            var sum = 0;
            if (folder.files != null)
            {
                if (hack)
                {
                    sum = folder.files.Length;
                }
                else
                {
                    var reg = new Regex(@"\w+\.hack\b");
                    foreach (var file in folder.files)
                        if (reg.IsMatch(file))
                        {
                            hack = true;
                            sum = folder.files.Length;
                            break;
                        }
                }
            }
            if (folder.folders != null)
                foreach (var f in folder.folders)
                    sum += GetCount(f, hack);

            return sum;
        }

        public static void Main()
        {
            var options = new JsonSerializerOptions
            {
                MaxDepth = 1024
            };

            var opt = new JsonDocumentOptions
            {
                MaxDepth = 1024
            };
            using var input = new StreamReader(Console.OpenStandardInput());
            using var output = new StreamWriter(Console.OpenStandardOutput());

            var count = int.Parse(input.ReadLine());
            while (count-- > 0)
            {
                var path = new StringBuilder();
                var cnt = int.Parse(input.ReadLine());
                while (cnt-- > 0)
                {
                    path.Append(input.ReadLine());
                }
                var jDock = JsonDocument.Parse(path.ToString(), opt);
                Folder rootFolder = JsonSerializer.Deserialize<Folder>(jDock, options);
                output.WriteLine(GetCount(rootFolder, false));

            }
        }
    }

}
