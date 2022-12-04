using System.Reflection;

namespace Lentinula.Utils.Helpers;

/// <summary>
///     反射相关操作的帮助类，采用单例模式，懒加载
/// </summary>
public sealed class ReflectionHelper
{
    private static readonly Lazy<ReflectionHelper> Lazy = new(() => new());
    private ReflectionHelper()
    {
        Console.WriteLine("Loading RefectionHelper...");
    }

    public static ReflectionHelper Instance => Lazy.Value;

    
    /// <summary>
    ///     项目下的所有，前缀和当前程序集相同的程序集
    /// </summary>
    public Assembly[] AllAssemblies => AppDomain.CurrentDomain.GetAssemblies()
        .Where(assembly => assembly.FullName!.StartsWith(AppDomain.CurrentDomain.FriendlyName.Split('.')[0]))
        .OrderBy(assembly => assembly.FullName).ToArray();

    /// <summary>
    ///     所有普通类型
    /// </summary>
    /// <remarks>项目下的所有，前缀和当前程序集相同的程序集</remarks>
    public Type[] AllTypes => AllAssemblies.SelectMany(assembly => assembly.GetTypes()).ToArray();

    /// <summary>
    ///     所有普通类型（非接口、非泛型、非抽象类）
    /// </summary>
    /// <remarks>项目下的所有，前缀和当前程序集相同的程序集</remarks>
    public Type[] AllNormalTypes => AllTypes.Where(type => type.IsClass && !type.IsGenericType && !type.IsAbstract).ToArray();

}
