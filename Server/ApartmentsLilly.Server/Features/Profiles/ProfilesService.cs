namespace ApartmentsLilly.Server.Features.Profiles
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models;
    using Infrastructure.Mapping;
    using Infrastructure.Services;
    using Models;
    using Microsoft.EntityFrameworkCore;
    using System;

    public class ProfilesService : IProfilesService
    {
        private readonly ApartmentsLillyDbContext data;

        public ProfilesService(ApartmentsLillyDbContext data) => this.data = data;

        public async Task<ProfileServiceModel> ByUser(string userId)
            => await this.data
                .Users
                .Where(u => u.Id == userId)
                .To<ProfileServiceModel>()
                .FirstOrDefaultAsync();

        public async Task<Result> Update(
            string userId,
            string email,
            string userName,
            string firstName,
            string lastName,
            string avatarUrl,
            string phoneNumber)
        {
            var user = await this.data
                .Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(p => p.Id == userId);

            if (user == null)
            {
                return "User does not exist.";
            }

            if (user.Profile == null)
            {
                user.Profile = new Profile();
            }

            var result = await this.ChangeEmail(user, userId, email);

            if (result.Failure)
            {
                return result;
            }

            result = await this.ChangeUserName(user, userId, userName);

            if (result.Failure)
            {
                return result;
            }

            this.ChangeProfile(
                user.Profile,
                firstName,
                lastName,
                avatarUrl,
                phoneNumber);

            await this.data.SaveChangesAsync();

            return true;
        }

        private async Task<Result> ChangeEmail(User user, string userId, string email)
        {
            if (!string.IsNullOrWhiteSpace(email) && user.Email != email)
            {
                var emailExists = await this.data
                    .Users
                    .AnyAsync(u => u.Id != userId && u.Email == email);

                if (emailExists)
                {
                    return "The provided e-mail is already taken.";
                }

                user.Email = email;
            }

            return true;
        }

        private async Task<Result> ChangeUserName(User user, string userId, string userName)
        {
            if (!string.IsNullOrWhiteSpace(userName) && user.UserName != userName)
            {
                var userNameExists = await this.data
                    .Users
                    .AnyAsync(u => u.Id != userId && u.UserName == userName);

                if (userNameExists)
                {
                    return "Provided username is already taken.";
                }

                user.UserName = userName;
            }

            return true;
        }

        private void ChangeProfile(
            Profile profile,
            string firsName,
            string lastName,
            string avatarUrl,
            string phoneNumber)
        {
            if (profile.FirstName != firsName)
            {
                profile.FirstName = firsName;
            }

            if (profile.LastName != lastName)
            {
                profile.LastName = lastName;
            }
            // add change image logic

            if (profile.AvatarUrl != avatarUrl)
            {
                profile.AvatarUrl = avatarUrl;
            }

            if (profile.PhoneNumber != phoneNumber)
            {
                profile.PhoneNumber = phoneNumber;
            }
        }

        public async Task<Result> Delete(string id)
        {
            var profile = await this.data
                .Profiles
                .FirstOrDefaultAsync(p => p.UserId == id);

            if (profile != null)
            {
                this.data.Profiles.Remove(profile);
            }

            return true;
        }

        public async Task<IEnumerable<T>> GetAll<T>(List<string> ids)
        {
            return await this.data.Users
                .OrderBy(u => u.IsDeleted ? 1 : 0)
                .ThenByDescending(u => ids.Contains(u.Id) ? 1 : 0)
                .To<T>()
                .ToListAsync();
        }
    }
}
