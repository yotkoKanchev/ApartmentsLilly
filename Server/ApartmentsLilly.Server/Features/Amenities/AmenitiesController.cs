namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Threading.Tasks;
    using Data;
    using Models;
    using Microsoft.AspNetCore.Mvc;

    public class AmenitiesController: ApiController
    {
        private readonly ApartmentsLillyDbContext data;

        public AmenitiesController(ApartmentsLillyDbContext data)
        {
            this.data = data;
        }

        //public async Task<ActionResult> Create(CreateAmenityRequestModel model)
        //{
        //    return this.Ok();
        //}
    }
}
