﻿namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Data.Models.Amenities;
    using Infrastructure.Extensions;
    using Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.GlobalConstants;

    [Authorize(Roles = AdminRole)]
    public class AmenitiesController : ApiController
    {
        private readonly IAmenitiesService amenities;

        public AmenitiesController(IAmenitiesService amenities)
        {
            this.amenities = amenities;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateAmenityRequestModel model)
        {
            var result = await this.amenities.Create(model.ApartmentId, model.RoomId, model.Name, model.Importance);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Created(nameof(this.Create), result.Succeeded);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(DeleteAmenityRequestModel model)
        {
            var result = await this.amenities.Delete(model.ApartmentId, model.RoomId, model.AmenityId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet]
        [Route(nameof(ImportanceTypes))]
        public ActionResult ImportanceTypes()
        {
            var types = EnumExtensions.GetValues<AmenityImportance>();

            return Ok(types);
        }
    }
}
