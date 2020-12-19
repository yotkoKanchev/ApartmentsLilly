namespace ApartmentsLilly.Server.Features.Identity
{
    using System.Linq;
    using System.Threading.Tasks;
    using Data.Models;
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
        private readonly AppSettings appSettings;

        public IdentityController(
            ApartmentsLillyDbContext data,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IIdentityService identity,
            IOptions<AppSettings> appSettings)
        {
            this.data = data;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.identity = identity;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
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
                await this.roleManager.CreateAsync(new IdentityRole(AdminRole));
                await this.roleManager.CreateAsync(new IdentityRole(UserRole));
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
    }
}
