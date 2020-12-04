namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;

    using static Infrastructure.WebConstants;

    public class RoomsController : ApiController
    {
        private readonly IRoomsService rooms;

        public RoomsController(IRoomsService rooms)
        {
            this.rooms = rooms;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Create(CreateRoomRequestModel model)
        {
            var result = await this.rooms.Create(
                model.RoomType,
                model.ApartmentId);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Created(nameof(this.Create), new CreateRoomResponseModel { Id = result.StringValue });
        }

        [HttpGet]
        [Route(nameof(All))]
        [AllowAnonymous]
        public async Task<IEnumerable<RoomListingServiceModel>> All(int apartmentId)
        {
            return await this.rooms.GetAllByApartmentId(apartmentId);
        }

        [HttpGet]
        [Route(Id)]
        [AllowAnonymous]
        public async Task<RoomDetailsServiceModel> Details(string id)
        {
            return await this.rooms.GetById(id);
        }

        [HttpPut]
        [Route(Id)]
        public async Task<ActionResult> Update(string id, UpdateRoomRequestModel model)
        {
            var result = await this.rooms.Update(id, model.IsSleepable, model.RoomType);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        [AllowAnonymous]
        public async Task<ActionResult> Delete(string id)
        {
            var result = await this.rooms
                .Delete(id);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
