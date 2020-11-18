namespace ApartmentsLilly.Server.Infrastructure.Services
{
    using System.Security.Claims;
    using Extensions;
    using Microsoft.AspNetCore.Http;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly ClaimsPrincipal user;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor) 
            => this.user = httpContextAccessor.HttpContext?.User;

        public string GetUserName()
            => this.user?.Identity?.Name;

        public string GetId()
            => this.user?.GetId();
    }
}
