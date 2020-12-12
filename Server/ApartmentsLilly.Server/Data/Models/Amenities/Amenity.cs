namespace ApartmentsLilly.Server.Data.Models.Amenities
{
    using System.Collections.Generic;
    using Base;
    using Mappings;

    public class Amenity : DeletableEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public AmenityImportance Importance {get;set;}

    public virtual ICollection<ApartmentAmenity> Apartments { get; set; }
}
}
