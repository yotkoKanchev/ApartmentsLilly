namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Apartments;
    using Infrastructure.Services;
    using Models;
    using Rooms;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;
    using ApartmentsLilly.Server.Data.Models.Amenities;
    using ApartmentsLilly.Server.Infrastructure.Extensions;

    [AllowAnonymous]
    public class AmenitiesController : ApiController
    {
        private readonly IAmenitiesService amenities;
        private readonly IApartmentsService apartments;
        private readonly IRoomsService rooms;

        public AmenitiesController(IAmenitiesService amenities, IApartmentsService apartments, IRoomsService rooms)
        {
            this.amenities = amenities;
            this.apartments = apartments;
            this.rooms = rooms;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateAmenityRequestModel model)
        {
            var id = await this.amenities.Create(model.Name);

            var result = await this.apartments.CreateApartmentAmenity(model.ApartmentId, id, model.Importance);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Created(nameof(this.Create), id);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<AmenityDetailsServiceModel> Details(int id, int apartmentId)
        {
            return await this.amenities.GetById(id, apartmentId);
        }

        [HttpPut]
        [Route(Id)]
        [AllowAnonymous]

        public async Task<ActionResult> Update(int id, UpdateAmenityRequestModel model)
        {
            Result result = await this.amenities.Update(id, model.Name, model.Importance);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id, int apartmentId)
        {
            var result = await this.apartments.DeleteApartmentAmenity(apartmentId, id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            result = await this.amenities.Delete(id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet]
        [Route(nameof(ImportanceTypes))]
        [AllowAnonymous]
        public ActionResult ImportanceTypes()
        {
            var types = EnumExtensions.GetValues<AmenityImportance>();

            return Ok(types);
        }
    }
}
