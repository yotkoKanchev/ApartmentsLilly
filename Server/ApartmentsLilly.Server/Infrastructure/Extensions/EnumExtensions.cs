using System;
using System.Collections.Generic;

namespace ApartmentsLilly.Server.Infrastructure.Extensions
{
    public static class EnumExtensions
    {
        public static List<EnumValue> GetValues<T>()
        {
            var values = new List<EnumValue>();
            foreach (var itemType in Enum.GetValues(typeof(T)))
            {
                values.Add(new EnumValue()
                {
                    Name = Enum.GetName(typeof(T), itemType),
                    Value = (int)itemType
                });
            }
            return values;
        }

        public class EnumValue
        {
            public string Name { get; set; }
            public int Value { get; set; }
        }
    }
   
}
