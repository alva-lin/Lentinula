﻿namespace Lentinula.Utils.Extensions;

public static class ArrayExtension
{
    public static T[] Empty<T>(this Array array)
    {
        return new T[] { };
    }
}
