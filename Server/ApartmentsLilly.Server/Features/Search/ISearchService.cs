namespace ApartmentsLilly.Server.Features.Search
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models;

    public interface ISearchService
    {
        Task<IEnumerable<ProfileSearchServiceModel>> Profiles(string query);
    }
}
