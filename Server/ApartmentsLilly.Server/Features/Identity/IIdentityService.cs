namespace ApartmentsLilly.Server.Features.Identity
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName, string role, string secret);
    }
}
