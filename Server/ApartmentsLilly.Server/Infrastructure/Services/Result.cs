namespace ApartmentsLilly.Server.Infrastructure.Services
{
    public class Result
    {
        public int IntValue { get; private set; }

        public string StringValue { get; set; }

        public bool Succeeded { get; private set; }

        public bool Failure => !this.Succeeded;

        public string Error { get; private set; }

        public static implicit operator Result(bool succeeded)
            => new Result { Succeeded = succeeded };

        public static implicit operator Result(int id)
            => new Result
            {
                Succeeded = true,
                IntValue = id,
            };

        public static implicit operator Result(string error)
            => new Result
            {
                Succeeded = false,
                Error = error,
            };

        // TODO find way to remove this work around!
        public static implicit operator Result((string id, bool succeeded) tuple)
        {
            return new Result
            {
                Succeeded = true,
                StringValue = tuple.id,
            };
        }
    }
}
