namespace ApartmentsLilly.Server.Features.Rooms
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Data.Models.Rooms;
    using Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;
    using ApartmentsLilly.Server.Infrastructure.Extensions;

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
                model.Name,
                model.RoomType,
                model.IsSleepable,
                model.ApartmentId);

            if (result.Failure)
            {
                return BadRequest(result.Error);
            }

            return Created(nameof(this.Create), new CreateRoomResponseModel { Id = result.IntValue });
        }

        [HttpGet]
        [Route("All/{apartmentId}")]
        [AllowAnonymous]
        public async Task<IEnumerable<RoomListingServiceModel>> All(int apartmentId)
        {
            return await this.rooms.GetAllByApartmentId(apartmentId);
        }

        [HttpGet]
        [Route(Id)]
        [AllowAnonymous]
        public async Task<RoomDetailsServiceModel> Details(int id)
        {
            return await this.rooms.GetById(id);
        }

        [HttpGet]
        [Route(nameof(RoomTypes))]
        [AllowAnonymous]
        public ActionResult RoomTypes()
        {
            var types =  EnumExtensions.GetValues<RoomType>();

            return Ok(types);
        }

        [HttpPut]
        [Route(Id)]
        public async Task<ActionResult> Update(int id, UpdateRoomRequestModel model)
        {
            var result = await this.rooms.Update(id, model.Name, model.RoomType.Value, model.IsSleepable);

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
