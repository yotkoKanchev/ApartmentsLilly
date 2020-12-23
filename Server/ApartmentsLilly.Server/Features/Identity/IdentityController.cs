namespace ApartmentsLilly.Server.Features.Identity
{
    using System.Linq;
    using System.Threading.Tasks;
    using Data.Models;
    using Features.Profiles;
    using Models;
    using Server.Data;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    using static Infrastructure.WebConstants;

    public class IdentityController : ApiController
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IIdentityService identity;
        private readonly IProfilesService profiles;
        private readonly AppSettings appSettings;

        public IdentityController(
            ApartmentsLillyDbContext data,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IIdentityService identity,
            IOptions<AppSettings> appSettings,
            IProfilesService profiles)
        {
            this.data = data;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.identity = identity;
            this.profiles = profiles;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }

            // TODO check if username exists!!!!

            var user = new User
            {
                Email = model.Email,
                UserName = model.UserName
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (await data.Users.CountAsync() == 1)
            {
                await this.userManager.AddToRoleAsync(user, AdminRole);
            }
            else
            {
                await this.userManager.AddToRoleAsync(user, UserRole);
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return Unauthorized("Username or password are not valid.");
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }

            var roles = await this.userManager.GetRolesAsync(user);

            var token = this.identity.GenerateJwtToken(
                user.Id,
                user.UserName,
                roles.FirstOrDefault(),
            this.appSettings.Secret);

            return new LoginResponseModel
            {
                Token = token,
                Name = user.UserName,
                IsAdmin = await this.userManager.IsInRoleAsync(user, AdminRole),
            };
        }

        [HttpDelete]
        [Route(nameof(Delete))]
        public async Task<ActionResult> Delete(DeleteUserRequestModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }

            var user = await this.userManager.GetUserAsync(this.User);
            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }

            var result = await this.profiles.Delete(user.Id);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            var userDeletionResult = await this.userManager.DeleteAsync(user);

            if (!userDeletionResult.Succeeded)
            {
                return BadRequest(userDeletionResult.Errors);
            }

            return Ok();
        }
    }
}
