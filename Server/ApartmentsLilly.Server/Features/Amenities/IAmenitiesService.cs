﻿namespace ApartmentsLilly.Server.Features.Amenities
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Amenities.Models;
    using Infrastructure.Services;

    public interface IAmenitiesService
    {
        Task<int> Create(string name, int importance);

        Task<Result> Update(int id, string name);

        Task<IEnumerable<AmenitiesListingServiceModel>> GetAllByApartmentId(int apartmentId);

        Task<Result> Delete(int id);
    }
}