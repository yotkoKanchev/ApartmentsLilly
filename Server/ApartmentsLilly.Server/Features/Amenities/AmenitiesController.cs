namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Data.Models.Amenities;
    using Infrastructure.Extensions;
    using Infrastructure.Services;
    using Models;
    using Microsoft.AspNetCore.Mvc;

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
            var result = await this.amenities.Create(model.ApartmentId, model.Name, model.Importance);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Created(nameof(this.Create), result.Succeeded);
        }

        [HttpGet]
        public async Task<AmenityDetailsServiceModel> Details(int apartmentId, int id)
        {
            return await this.amenities.GetById<AmenityDetailsServiceModel>(apartmentId, id);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateAmenityRequestModel model)
        {
            Result result = await this.amenities.Update(model.ApartmentId, model.AmenityId, model.Name, model.Importance);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int apartmentId, int amenityId)
        {
            var result = await this.amenities.Delete(apartmentId, amenityId);

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
