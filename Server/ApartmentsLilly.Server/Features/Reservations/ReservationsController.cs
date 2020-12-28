namespace ApartmentsLilly.Server.Features.Reservations
{
    using System.Threading.Tasks;
    using Data.Models;
    using Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;
    using System;

    [AllowAnonymous]
    public class ReservationsController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IReservationsService reservations;

        public ReservationsController(UserManager<User> userManager, IReservationsService reservations)
        {
            this.userManager = userManager;
            this.reservations = reservations;
        }

        [HttpPost]
        [Route("request")]
        public async Task<ActionResult> CreateRequest(CreateRequestInputModel model)
        {
            User user;
            string password = null;
            var isAuthenticated = User.Identity.IsAuthenticated;

            if (isAuthenticated)
            {
                user = await this.userManager.GetUserAsync(this.User);
            }
            else
            {
                user = new User
                {
                    Email = model.Email,
                    // TODO may not work because of @
                    UserName = model.Email,
                };

                var hash = model.Email.GetHashCode().ToString();

                if (char.IsLetter(hash[0]))
                {
                    password = hash;
                }
                else
                {
                    password = hash[1..];
                }

                var userResult = await this.userManager.CreateAsync(user, password);

                if (!userResult.Succeeded)
                {
                    return BadRequest(userResult.Errors);
                }

                await this.userManager.AddToRoleAsync(user, UserRole);
            }

            // TODO add validation if firstName, lastName or email are null

                var confirmation = await this.reservations.Create(user.Id, model.FirstName, model.LastName, model.Email, model.PhoneNumber, model.AdditionalInfo,
                model.From, model.To, model.Adults, model.Children, model.Infants);

            if (isAuthenticated)
            {
                return Created(nameof(Created), new CreateRequestResponceModel
                {
                    Confirmation = confirmation,
                });
            }
            else
            {
                return Created(nameof(Created), new CreateRequestNewUserResponceModel
                {
                    Confirmation = confirmation,
                    Password = password,
                    Email = model.Email,
                    UserName = model.Email,
                });
            }
        }
    }
}
