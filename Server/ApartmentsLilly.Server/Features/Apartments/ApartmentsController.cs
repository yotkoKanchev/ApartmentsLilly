﻿namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using ApartmentsLilly.Server.Infrastructure.Services;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    public class ApartmentsController : ApiController
    {
        private IApartmentsService apartments;

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
            var aps = await this.apartments.GetAll();

            return aps;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ApartmentDetailsServiceModel> Details(int id)
        {
            var aps = await this.apartments.GetById(id);

            return aps;
        }

        [HttpDelete]
        [AllowAnonymous]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await this.apartments
                .Delete(id);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
