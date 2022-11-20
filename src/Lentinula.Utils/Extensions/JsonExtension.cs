using System.Text.Encodings.Web;
using System.Text.Json;

namespace Lentinula.Utils.Extensions;

public static class JsonExtension
{
    public static string ToJson(this object obj)
    {
        var options = new JsonSerializerOptions()
        {
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };
        return JsonSerializer.Serialize(obj, options);
    }
}
