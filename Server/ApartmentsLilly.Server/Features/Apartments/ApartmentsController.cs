namespace ApartmentsLilly.Server.Features.Apartments
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;

    public class ApartmentsController : ApiController
    {
        private readonly IApartmentsService apartments;

        public ApartmentsController(IApartmentsService apartments)
        {
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
                model.HasTerrace,
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
        [AllowAnonymous]
        public async Task<IEnumerable<ApartmentListingServiceModel>> All()
        {
            return await this.apartments.GetAll();
        }

        [Route(nameof(Search))]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<ApartmentListingServiceModel>> Search(DateTime startDate, DateTime endDate)
        {
            return await this.apartments.GetAllAvailable(startDate, endDate);
        }

        [HttpGet]
        [Route(Id)]
        [AllowAnonymous]
        public async Task<ApartmentDetailsServiceModel> Details(int id)
        {
            return await this.apartments.GetById(id);
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
                model.HasTerrace,
                model.MaxOccupants.Value,
                model.MainImageUrl,
                model.AddressId);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        [AllowAnonymous]
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
