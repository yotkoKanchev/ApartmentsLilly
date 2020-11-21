﻿namespace ApartmentsLilly.Server.Features.Apartments
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using ApartmentsLilly.Server.Features.Apartments.Models;
    using ApartmentsLilly.Server.Mapping;
    using Data;
    using Data.Models;
    using Features.Addresses;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;

    public class ApartmentsService : IApartmentsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IAddressService address;

        public ApartmentsService(ApartmentsLillyDbContext data, IAddressService address)
        {
            this.data = data;
            this.address = address;
        }

        public async Task<Result> Create(string addressId, string name, string description, string entry, int? floor, string number, double? size,
            double? basePrice, bool hasTerrace, int? maxOccupants, string mainImageUrl)
        {
            var isAddressExists = await this.address.Exists(addressId);

            if (isAddressExists == false)
            {
                return $"Address with Id: {addressId} does not exists.";
            }

            var apartment = new Apartment
            {
                AddressId = addressId,
                Name = name,
                Description = description,
                Entry = entry,
                Floor = floor.Value,
                Number = number,
                Size = size.Value,
                BasePrice = basePrice.Value,
                HasTerrace = hasTerrace,
                MaxOccupants = maxOccupants.Value,
                MainImageUrl = mainImageUrl,
            };

            this.data.Add(apartment);
            await this.data.SaveChangesAsync();

            return apartment.Id;
        }

        public async Task<IEnumerable<ApartmentListingServiceModel>> GetAll()
        {
            return await this.data
                .Apartments
                .To<ApartmentListingServiceModel>()
                .ToListAsync();
        }
    }
}