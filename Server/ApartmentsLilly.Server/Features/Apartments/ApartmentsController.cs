namespace ApartmentsLilly.Server.Features.Apartments
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Data.Models;
    using Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;

    [Authorize(Roles = AdminRole)]
    public class ApartmentsController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IApartmentsService apartments;

        public ApartmentsController(UserManager<User> userManager, IApartmentsService apartments)
        {
            this.userManager = userManager;
            this.apartments = apartments;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateApartmentRequestModel model)
        {
            var result = await this.apartments.Create(
                model.AddressId,
                model.Name,
                model.Description,
                model.Entry,
                model.Floor.Value,
                model.Number,
                model.Size.Value,
                model.BasePrice.Value,
                model.MaxOccupants.Value,
                model.MainImageUrl);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Created(nameof(this.Create), new CreateApartmentResponseModel { Id = result.IntValue });
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<ApartmentListingServiceModel>> All()
        {
            return await this.apartments.GetAll<ApartmentListingServiceModel>();
        }

        [Route(nameof(Search))]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<ApartmentListingServiceModel>> Search(DateTime startDate, DateTime endDate)
        {
            return await this.apartments.GetAllAvailable<ApartmentListingServiceModel>(startDate, endDate);
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ApartmentDetailsServiceModel> Details(int id)
        {
            return await this.apartments.GetById<ApartmentDetailsServiceModel>(id);
        }

        [HttpPut]
        [Route(Id)]
        public async Task<ActionResult> Update(int id, UpdateApartmentRequestModel model)
        {
            var result = await this.apartments.Update(
                id,
                model.Name,
                model.Description,
                model.Entry,
                model.Floor,
                model.Number,
                model.Size.Value,
                model.BasePrice.Value,
                model.MaxOccupants.Value,
                model.MainImageUrl,
                model.AddressId);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut(nameof(ChangeAddress))]
        public async Task<ActionResult> ChangeAddress([FromBody] UpdateApartmentAddressRequestModel model)
        {
            var result = await this.apartments.ChangeAddress(model.Id, model.AddressId);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await this.apartments.Delete(id);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
