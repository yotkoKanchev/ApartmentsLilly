﻿namespace ApartmentsLilly.Server.Features.Amenities.Models
{
    public class DeleteAmenityRequestModel
    {
        public int AmenityId { get; set; }

        public int? ApartmentId { get; set; }

        public int? RoomId { get; set; }
    }
}
