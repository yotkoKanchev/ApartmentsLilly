namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Apartments;
    using Infrastructure.Services;
    using Models;
    using Rooms;
    using Microsoft.AspNetCore.Mvc;

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
                    result = await this.apartments.CreateApartmentAmenity(model.ApartmentId.Value, amenityId);

                    if (result.Failure)
                    {
                        return this.BadRequest(result.StringValue);
                    }
                    break;
                case "Room":
                    result = await this.rooms.CreateRoomAmenity(model.RoomId.Value, amenityId);

                    if (result.Failure)
                    {
                        return this.BadRequest(result.StringValue);
                    }
                    break;
            }
        
            return Created(nameof(this.Create), new CreateAmenityResponseModel { Id = amenityId });
        }
    }
}
