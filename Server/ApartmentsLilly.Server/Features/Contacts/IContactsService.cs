using ApartmentsLilly.Server.Infrastructure.Services;
namespace ApartmentsLilly.Server.Features.Contacts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IContactsService
    {
        Task Create(string userId, string ip, string name, string email, string title, string content);

        Task<T> GetById<T>(int id);

        Task<IEnumerable<T>> GetAll<T>();

        Task<Result> Reply(int id, string replyContent);

        Task<Result> Ignore(int id);
    }
}
