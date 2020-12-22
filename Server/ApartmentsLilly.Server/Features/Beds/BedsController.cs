namespace ApartmentsLilly.Server.Features.Beds
{
    using System.Threading.Tasks;
    using Data.Models.Beds;
    using Infrastructure.Extensions;
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

        [HttpGet]
        [Route(nameof(BedTypes))]
        public ActionResult BedTypes()
        {
            return Ok(EnumExtensions.GetValues<BedType>());
        }
    }
}
