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
            var amenityId = await this.amenities.Create(model.Name);

            Result result;

            switch (model.Type)
            {
                case "Apartment":
                    result = await this.apartments.CreateApartmentAmenity(model.Id, amenityId);

                    if (result.Failure)
                    {
                        return this.BadRequest(result.Error);
                    }
                    break;
                case "Room":
                    result = await this.rooms.CreateRoomAmenity(model.Id, amenityId);

                    if (result.Failure)
                    {
                        return this.BadRequest(result.Error);
                    }
                    break;
            }
        
            return Created(nameof(this.Create), new CreateAmenityResponseModel { Id = amenityId });
        }

        [HttpGet]
        [Route(nameof(AllByApartment))]
        public async Task<IEnumerable<AmenitiesListingServiceModel>> AllByApartment(int apartmentId)
        {
            return await this.amenities.GetAllByApartmentId(apartmentId);
        }

        [HttpGet]
        [Route(nameof(AllByRoom))]
        public async Task<IEnumerable<AmenitiesListingServiceModel>> AllByRoom(int roomId)
        {
            return await this.amenities.GetAllByRoomId(roomId);
        }

        [HttpPut]
        [Route(Id)]
        public async Task<ActionResult> Update(int id, UpdateAmenityRequestModel model)
        {
            Result result = await this.amenities.Update(id, model.Name);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(DeleteAmenityRequestModel model)
        {
            Result result;

            switch (model.Type)
            {
                case "Apartment":
                    result = await this.apartments.DeleteApartmentAmenity(model.Id, model.AmenityId);
                    if (result.Failure)
                    {
                        return this.BadRequest(result.Error);
                    }
                    break;
                case "Room":
                    result = await this.rooms.DeleteRoomAmenity(model.Id, model.AmenityId);
                    if (result.Failure)
                    {
                        return this.BadRequest(result.Error);
                    }
                    break;
            }

            result = await this.amenities.Delete(model.AmenityId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
