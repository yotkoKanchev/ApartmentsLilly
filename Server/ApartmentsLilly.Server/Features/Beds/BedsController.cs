namespace ApartmentsLilly.Server.Features.Beds
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;

    public class BedsController : ApiController
    {
        private readonly IBedsService beds;

        public BedsController(IBedsService beds)
        {
            this.beds = beds;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateBedRequestModel model)
        {
            var result = await this.beds.Create(model.RoomId, model.BedType);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Created(nameof(this.Create), result.Succeeded);
        }

        [HttpGet]
        [Route(Id)]
        public async Task<BedDetailsServiceModel> Details(int id)
        {
            return await this.beds.GetById<BedDetailsServiceModel>(id);
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<BedDetailsServiceModel>> All(int apartmentId)
        {
            return await this.beds.GetByApartmentId<BedDetailsServiceModel>(apartmentId);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateBedRequestModel model)
        {
            var result = await this.beds.Update(model.Id, model.BedType);

            if (result.Failure)
            {
                this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await this.beds.Delete(id);

            if (result.Failure)
            {
                this.BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
