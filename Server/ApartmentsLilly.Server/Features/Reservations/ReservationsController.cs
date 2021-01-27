namespace ApartmentsLilly.Server.Features.Reservations
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Data.Models;
    using Data.Models.Reservations;
    using Infrastructure.Extensions;
    using Models;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.GlobalConstants;
    using static Infrastructure.WebConstants;

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
        public async Task<ActionResult> Create(CreateReservationRequestModel model)
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

            var confirmation = await this.reservations.Create(user.Id, model.ApartmentId, model.FirstName, model.LastName, model.Email, model.PhoneNumber, model.AdditionalInfo,
            model.From, model.To, model.Adults, model.Children, model.Infants);

            if (isAuthenticated)
            {
                return Created(nameof(Created), new CreateReservationResponceModel
                {
                    Confirmation = confirmation,
                });
            }
            else
            {
                return Created(nameof(Created), new CreateReservationNewUserResponceModel
                {
                    Confirmation = confirmation,
                    Password = password,
                    UserName = model.Email,
                });
            }
        }

        [HttpGet]
        [Route("mine")]
        public async Task<IEnumerable<ReservationListingServiceModel>> Mine()
        {
            var user = await this.userManager.GetUserAsync(this.User);
            return await this.reservations.GetMine<ReservationListingServiceModel>(user.Id);
        }

        [HttpGet]
        [Route(nameof(All))]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<ReservationListingServiceModel>> All(string status)
        {
            return await this.reservations.GetAll<ReservationListingServiceModel>(status);
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ReservationDetailsServiceModel> Details(int id)
        {
            return await this.reservations.GetDetails<ReservationDetailsServiceModel>(id);
        }

        [HttpPut]
        [Route(Id)]
        public async Task<ActionResult> Cancel(int id)
        {
            var user = await this.userManager.GetUserAsync(this.User);

            var result = await this.reservations.Cancel(id, user.Id);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        [Route("edit/" + Id)]
        public async Task<ActionResult> Edit(int id, EditReservationRequestModel model)
        {
            var result = await this.reservations.Update(
               id,
               model.FirstName,
               model.LastName,
               model.Email,
               model.PhoneNumber,
               model.AdditionalInfo,
               model.From,
               model.To,
               model.Status,
               model.Adults,
               model.Children,
               model.Infants);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet]
        [Route(nameof(Statuses))]
        public ActionResult Statuses()
        {
            var types = EnumExtensions.GetValues<ReservationStatus>();

            return Ok(types);
        }
    }

}
