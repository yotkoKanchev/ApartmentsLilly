namespace ApartmentsLilly.Server.Features.Profiles
{
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Data.Models;
    using Infrastructure.Services;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class ProfileService : IProfileService
    {
        private readonly ApartmentsLillyDbContext data;

        public ProfileService(ApartmentsLillyDbContext data) => this.data = data;

        public async Task<ProfileServiceModel> ByUser(string userId)
            => await this.data
                .Users
                .Where(u => u.Id == userId)
                .Select(u => new ProfileServiceModel
                {
                    FirstName = u.Profile.FirstName,
                    LastName = u.Profile.LastName,
                    MainImage = u.Profile.MainImage.Url,
                })
                .FirstOrDefaultAsync();

        public async Task<Result> Update(
            string userId,
            string email,
            string firstName,
            string lastName,
            string name,
            string mainPhotoUrl,
            string webSite,
            string biography,
            Gender gender)
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

            result = await this.ChangeUserName(user, userId, email);
            if (result.Failure)
            {
                return result;
            }

            this.ChangeProfile(
                user.Profile,
                firstName,
                lastName,
                mainPhotoUrl, 
                gender);

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
                    return "The provided user name is already taken.";
                }

                user.UserName = userName;
            }

            return true;
        }

        private void ChangeProfile(
            Profile profile,
            string firsName,
            string lastName,
            string mainPhotoUrl,
            Gender gender)
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

            if (profile.Gender != gender)
            {
                profile.Gender = gender;
            }
        }
    }
}
