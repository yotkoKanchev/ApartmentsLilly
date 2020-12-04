namespace ApartmentsLilly.Server.Features.Profiles
{
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    using static Infrastructure.WebConstants;

    public class ProfilesController : ApiController
    {
        private readonly IProfileService profiles;
        private readonly ICurrentUserService currentUser;

        public ProfilesController(
            IProfileService profiles,
            ICurrentUserService currentUser)
        {
            this.profiles = profiles;
            this.currentUser = currentUser;
        }

        [HttpGet]
        public async Task<ProfileServiceModel> Mine()
            => await this.profiles.ByUser(this.currentUser.GetId());

        [HttpGet]
        [Route(Id)]
        public async Task<ProfileServiceModel> Details(string id)
        {
            return await this.profiles.ByUser(id);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateProfileRequestModel model)
        {
            var userId = this.currentUser.GetId();

            var result = await this.profiles.Update(
                userId,
                model.Email,
                model.UserName,
                model.FirstName,
                model.LastName,
                model.MainPhotoUrl,
                model.WebSite,
                model.Biography,
                model.Gender);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
