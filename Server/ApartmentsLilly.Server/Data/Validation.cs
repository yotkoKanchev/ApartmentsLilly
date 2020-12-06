namespace ApartmentsLilly.Server.Data
{
    public class Validation
    {
        public class Apartment
        {
            public const int ZeroValue = 0;
            public const int MaxDescriptionLength = 2000;
            public const int MaxNameLength = 30;
            public const int MinNameLength = 2;
            public const int EntryMaxLength = 10;
            public const int MinFloor = -2;
            public const int MaxFloor = 50;
            public const int NumberMinLength = 1;
            public const int NumberMaxLength = 10;
            public const int MaxSize = 1000;
            public const int MaxBasePrice = 10000;
            public const int MaximumOccupants = 100;
            public const string UrlPattern = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
        }

        public class User
        {
            public const int MaxNameLength = 20;
        }

        public class Address
        {
            public const int MinLength = 2;
            public const int MaxLength = 30;
            public const int MaxPostalCodeLength = 10;
            public const int MaxStreetAddressLength = 30;
        }
    }
}
