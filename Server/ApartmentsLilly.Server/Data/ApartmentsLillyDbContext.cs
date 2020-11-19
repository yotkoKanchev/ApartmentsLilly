namespace ApartmentsLilly.Server.Data
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Infrastructure.Services;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Models.Base;
    using Models.Beds;
    using Models.Bookings;
    using Models.Requests;
    using Models.Reviews;
    using Models.Rooms;

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
        
        public DbSet<Request> Requests { get; set; }

        public DbSet<Booking> Bookings { get; set; }

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
            builder
                .Entity<User>()
                .HasMany(u => u.Reviews)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<User>()
                .HasMany(u => u.Requests)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<User>()
                .HasMany(u => u.Bookings)
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

            builder
                .Entity<Apartment>()
                .HasQueryFilter(c => !c.IsDeleted)
                .HasOne(a => a.MainImage)
                .WithOne()
                .HasForeignKey<Image>(p => p.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Apartment>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Amenities)
                .WithOne(a => a.Apartment)
                .HasForeignKey(a => a.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Apartment>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Bookings)
                .WithOne(a => a.Apartment)
                .HasForeignKey(a => a.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Apartment>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Reviews)
                .WithOne(a => a.Apartment)
                .HasForeignKey(a => a.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Address>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Apartments)
                .WithOne(a => a.Address)
                .HasForeignKey(a => a.AddressId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Booking>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Reviews)
                .WithOne(a => a.Booking)
                .HasForeignKey(a => a.BookingId)
                .OnDelete(DeleteBehavior.Restrict);

            // TODO make user deletable by changing deletableentity to interface

            builder
                .Entity<Apartment>()
                .HasQueryFilter(c => !c.IsDeleted)
                .HasMany(a => a.CommonImages)
                .WithOne(i => i.Apartment)
                .HasForeignKey(i => i.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder
            //    .Entity<Image>()
            //    .HasQueryFilter(c => !c.IsDeleted)
            //    .HasOne(i => i.User)
            //    .WithOne()
            //    .HasForeignKey<User>(i => i.MainImage)
            //    .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Image>()
                .HasQueryFilter(c => !c.IsDeleted)
                .HasOne(i => i.Room)
                .WithMany(r => r.Images)
                .HasForeignKey(i => i.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Room>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasOne(r => r.Apartment)
                .WithMany(a => a.Rooms)
                .HasForeignKey(r => r.ApartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Room>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Beds)
                .WithOne(a => a.Room)
                .HasForeignKey(a => a.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<Room>()
                .HasQueryFilter(r => !r.IsDeleted)
                .HasMany(r => r.Amenities)
                .WithOne(a => a.Room)
                .HasForeignKey(a => a.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder
            //    .Entity<Cat>()
            //    .HasQueryFilter(c => !c.IsDeleted)
            //    .HasOne(c => c.User)
            //    .WithMany(u => u.Cats)
            //    .HasForeignKey(c => c.UserId)
            //    .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<Profile>(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

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
