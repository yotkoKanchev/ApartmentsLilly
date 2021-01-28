namespace ApartmentsLilly.Server.Features.Contacts
{
    using System.Threading.Tasks;

    using Models;

    using Microsoft.AspNetCore.Mvc;
    using ApartmentsLilly.Server.Data.Models;
    using Microsoft.AspNetCore.Identity;

    public class ContactsController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IContactsService contactsService;

        public ContactsController(UserManager<User> userManager, IContactsService contactsService)
        {
            this.userManager = userManager;
            this.contactsService = contactsService;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateContactEntryRequestModel model)
        {
            var user = await this.userManager.GetUserAsync(this.User);
            //var userId = user != null ? user.Id : null;
            await this.contactsService.Create(
                user.Id ?? null,
                model.Name,
                model.Email,
                model.Title,
                model.Content);

            return Ok();
        }
    }
}
