﻿namespace ApartmentsLilly.Server.Features.Identity.Models
{
    public class LoginResponseModel
    {
        public string Token { get; set; }

        public string Name { get; set; }

        public bool IsAdmin { get; set; }

        public string AvatarUrl { get; set; }
    }
}
