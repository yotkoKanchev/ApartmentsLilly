namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Threading.Tasks;
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
        [AllowAnonymous]
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
    }
}
