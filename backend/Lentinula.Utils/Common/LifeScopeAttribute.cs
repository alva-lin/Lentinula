using Lentinula.Utils.Enums;

namespace Lentinula.Utils.Common;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
public class LifeScopeAttribute : Attribute
{
    public LifeScopeAttribute(LifeScope scope)
    {
        Scope = scope;
    }

    public LifeScope Scope { get; set; }
}
