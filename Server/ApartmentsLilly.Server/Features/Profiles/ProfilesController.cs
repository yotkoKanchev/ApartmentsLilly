namespace ApartmentsLilly.Server.Features.Profiles
{
    using System.Threading.Tasks;
    using Data.Models;
    using Infrastructure.Services;
    using Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    public class ProfilesController : ApiController
    {
        private readonly IProfileService profiles;
        private readonly ICurrentUserService currentUser;
        private readonly UserManager<User> userManager;

        public ProfilesController(
            IProfileService profiles,
            ICurrentUserService currentUser,
            UserManager<User> userManager)
        {
            this.profiles = profiles;
            this.currentUser = currentUser;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<ProfileServiceModel> Mine()
        {
            return await this.profiles.ByUser(this.currentUser.GetId());
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<ActionResult> Update(UpdateProfileRequestModel model)
        {
            var userId = this.currentUser.GetId();

            var result = await this.profiles.Update(
                userId,
                model.Email,
                model.UserName,
                model.FirstName,
                model.LastName,
                model.AvatarUrl,
                model.PhoneNumber);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> ChangePassword(ChangePasswordRequestModel model)
        {
            var user = await this.userManager.GetUserAsync(this.User);

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }

            if (model.Password != model.NewPassword)
            {
                var result = await this.userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok();
            }

            string resetLink = await this.userManager.GeneratePasswordResetTokenAsync(user);

            // TODO Send email with this credentirals: (user.Id, "Reset Password", $"Please reset your password by using this {resetLink}");

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("ResetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok();
            }

            await this.userManager.ResetPasswordAsync(user, model.Code, model.Password);

            return Ok();
        }
    }
}

