namespace ApartmentsLilly.Server.Features.Contacts
{
    using System.Threading.Tasks;
    using System.Collections.Generic;

    using Models;

    using Microsoft.AspNetCore.Mvc;
    using ApartmentsLilly.Server.Data.Models;
    using Microsoft.AspNetCore.Identity;

    using static Infrastructure.WebConstants;

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
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            //var userId = user != null ? user.Id : null;
            await this.contactsService.Create(
                user.Id ?? null,
                ip,
                model.Name,
                model.Email,
                model.Title,
                model.Content);

            return Ok();
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ContactEntryDetailsServiceModel> Details(int id)
        {
            return await this.contactsService.GetById<ContactEntryDetailsServiceModel>(id);
        }

        [HttpGet]
        [Route(Id)]
        public async Task<IEnumerable<ContactEntryListingServiceModel>> All()
        {
            return await this.contactsService.GetAll<ContactEntryListingServiceModel>();
        }

        [HttpPut]
        public async Task<ActionResult> Reply(ContactEntryReplyRequestModel model)
        {
            var result = await this.contactsService.Reply(model.Id, model.Reply);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Ignore(int id)
        {
            var result = await this.contactsService.Ignore(id);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return Ok();
        }
    }
}
