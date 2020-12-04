namespace ApartmentsLilly.Server.Features.Search
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    public class SearchController : ApiController
    {
        private readonly ISearchService search;

        public SearchController(ISearchService search) => this.search = search;

        [HttpGet]
        [AllowAnonymous]
        [Route(nameof(Profiles))]
        public async Task<IEnumerable<ProfileSearchServiceModel>> Profiles(string query)
            => await this.search.Profiles(query);
    }
}
