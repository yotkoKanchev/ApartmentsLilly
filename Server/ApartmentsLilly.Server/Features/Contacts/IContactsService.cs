using ApartmentsLilly.Server.Infrastructure.Services;
namespace ApartmentsLilly.Server.Features.Contacts
{
    using System.Threading.Tasks;

    public interface IContactsService
    {
        Task Create(string userId, string name, string email, string title, string content);
    }
}
