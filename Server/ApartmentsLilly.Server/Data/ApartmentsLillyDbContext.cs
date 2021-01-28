namespace ApartmentsLilly.Server.Data
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Models;
    using Models.Amenities;
    using Models.Base;
    using Models.Beds;
    using Models.Mappings;
    using Models.Reservations;
    using Models.Reviews;
    using Models.Rooms;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class ApartmentsLillyDbContext : IdentityDbContext<User>
    {
        private readonly ICurrentUserService currentUser;

        public ApartmentsLillyDbContext(
            DbContextOptions<ApartmentsLillyDbContext> options,
            ICurrentUserService currentUser)
            : base(options)
            => this.currentUser = currentUser;

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<Apartment> Apartments { get; set; }

        public DbSet<Address> Addresses { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<Bed> Beds { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Amenity> Amenities { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<ApartmentAmenity> ApartmentAmenities { get; set; }

        public DbSet<RoomAmenity> RoomAmenities { get; set; }

        public DbSet<ContactFormEntry> ContactFormEntries { get; set; }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            this.ApplyAuditInformation();

            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
        {
            this.ApplyAuditInformation();

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder
            //    .Entity<User>()
            //    .HasQueryFilter(b => !b.IsDeleted)
            //    .HasMany(u => u.Reviews)
            //    .WithOne(r => r.User)
            //    .HasForeignKey(r => r.UserId)
            //    .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<User>()
                //.HasQueryFilter(b => !b.IsDeleted)
                .HasMany(u => u.Reservations)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Apartment>()
                .HasQueryFilter(b => !b.IsDeleted)
                .HasOne(b => b.Address)
                .WithMany(a => a.Apartments)
                .HasForeignKey(a => a.AddressId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder
            //    .Entity<Apartment>()
            //    .HasQueryFilter(r => !r.IsDeleted)
            //    .HasMany(r => r.Reviews)
            //    .WithOne(a => a.Apartment)
            //    .HasForeignKey(a => a.ApartmentId);

            builder
                .Entity<Apartment>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Rooms)
                .WithOne(a => a.Apartment)
                .HasForeignKey(a => a.ApartmentId);

            builder
                .Entity<Apartment>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Reservations)
                .WithOne(a => a.Apartment)
                .HasForeignKey(a => a.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Room>()
                .HasMany(r => r.Beds)
                .WithOne(a => a.Room)
                .HasForeignKey(a => a.RoomId);

            builder
                .Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<Profile>(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Review>()
                .HasOne(r => r.Reservation)
                .WithOne(b => b.Review)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<ApartmentAmenity>()
                .HasKey(aa => new { aa.AmenityId, aa.ApartmentId });

            builder
                .Entity<RoomAmenity>()
                .HasKey(aa => new { aa.AmenityId, aa.RoomId });

            builder
                .Entity<Profile>()
                .HasQueryFilter(b => !b.IsDeleted);

            builder
                .Entity<Address>()
                .HasQueryFilter(b => !b.IsDeleted);

            base.OnModelCreating(builder);
        }

        private void ApplyAuditInformation()
            => this.ChangeTracker
                .Entries()
                .ToList()
                .ForEach(entry =>
                {
                    var userName = this.currentUser.GetUserName();

                    if (entry.Entity is IDeletableEntity deletableEntity)
                    {
                        if (entry.State == EntityState.Deleted)
                        {
                            deletableEntity.DeletedOn = DateTime.UtcNow;
                            deletableEntity.DeletedBy = userName;
                            deletableEntity.IsDeleted = true;

                            entry.State = EntityState.Modified;

                            return;
                        }
                    }

                    if (entry.Entity is IEntity entity)
                    {
                        if (entry.State == EntityState.Added)
                        {
                            entity.CreatedOn = DateTime.UtcNow;
                            entity.CreatedBy = userName;
                        }
                        else if (entry.State == EntityState.Modified)
                        {
                            entity.ModifiedOn = DateTime.UtcNow;
                            entity.ModifiedBy = userName;
                        }
                    }
                });
    }
}
