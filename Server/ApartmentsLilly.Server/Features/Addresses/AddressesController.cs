namespace ApartmentsLilly.Server.Features.Addresses
{
    using System.Threading.Tasks;
    using Models;
    using Microsoft.AspNetCore.Mvc;

    using static Infrastructure.WebConstants;
    using System.Collections.Generic;

    public class AddressesController : ApiController
    {
        private readonly IAddressService addresses;

        public AddressesController(IAddressService addresses)
        {
            this.addresses = addresses;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateAddressRequestModel model)
        {
            var id = await this.addresses.Create(
                model.City,
                model.Country,
                model.PostalCode,
                model.Neighborhood,
                model.StreetAddress);

            return Created(nameof(this.Create), new CreateAddressResponseModel { Id = id });
        }

        [HttpGet]
        [Route(Id)]
        public async Task<AddressDetailsServiceModel> Details(string id)
        {
            return await this.addresses.Details(id);
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<AddressDetailsServiceModel>> All()
        {
            return await this.addresses.GetAll();
        }


        [HttpPut]
        [Route(Id)]
        public async Task<ActionResult> Update(string id, UpdateAddressRequestModel model)
        {
            var result = await this.addresses.Update(
                id,
                model.Country,
                model.City,
                model.PostalCode,
                model.Neighborhood,
                model.StreetAddress);

            if (result.Failure)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(string id)
        {
            var result = await this.addresses.Delete(id);

            if (result.Failure)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}