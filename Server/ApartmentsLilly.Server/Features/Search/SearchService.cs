namespace ApartmentsLilly.Server.Features.Search
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class SearchService : ISearchService
    {
        private readonly ApartmentsLillyDbContext data;

        public SearchService(ApartmentsLillyDbContext data) => this.data = data;

        public async Task<IEnumerable<ProfileSearchServiceModel>> Profiles(string query)
            => await this.data
                .Users
                .Where(u => u.UserName.ToLower().Contains(query.ToLower()) ||
                    u.Profile.FirstName.ToLower().Contains(query.ToLower()))
                .Select(u => new ProfileSearchServiceModel
                {
                    UserId = u.Id,
                    UserName = u.UserName,
                    //ProfilePhotoUrl = u.Profile.MainPhotoUrl
                })
                .ToListAsync();
    }
}
