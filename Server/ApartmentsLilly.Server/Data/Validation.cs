namespace ApartmentsLilly.Server.Data
{
    public class Validation
    {
        public class Apartment
        {
            public const int MaxDescriptionLength = 2000;
            public const int MaxNameLength = 30;
            public const int MinNameLength = 2;

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
