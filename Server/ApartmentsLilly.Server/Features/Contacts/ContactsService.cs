namespace ApartmentsLilly.Server.Features.Contacts
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Data;
    using Data.Models;
    using Infrastructure.Mapping;
    using Infrastructure.Messaging;
    using Models;

    using Microsoft.EntityFrameworkCore;
    using ApartmentsLilly.Server.Infrastructure.Services;

    public class ContactsService : IContactsService
    {
        private readonly ApartmentsLillyDbContext data;
        private readonly IEmailSender emailSender;

        public ContactsService(ApartmentsLillyDbContext data, IEmailSender emailSender)
        {
            this.data = data;
            this.emailSender = emailSender;
        }

        public async Task Create(string userId, string ip, string name, string email, string title, string content)
        {
            var contactFormEntry = new ContactFormEntry
            {
                AuthUserId = userId,
                Ip = ip,
                Name = name,
                Email = email,
                Title = title,
                Content = content,
            };

            await this.data.ContactFormEntries.AddAsync(contactFormEntry);
            await this.data.SaveChangesAsync();

            // TODO send Email
            await this.emailSender.SendEmailAsync(
                email,
                "Appartments Lilly Enquiery",
                "Thank you for your enquiery. We will get back to you soon");
        }

        public async Task<T> GetById<T>(int id)
        {
            var form = await this.data
                .ContactFormEntries
                .Where(r => r.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

            return form;
        }

        public async Task<IEnumerable<T>> GetAll<T>()
        {
            var query = await this.data
                .ContactFormEntries
                .Where(c => !c.IsReplyed)
                .OrderBy(r => r.CreatedOn)
                .Where(r => r.IsReplyed == false)
                .To<T>()
                .ToListAsync();

            return query;
        }

        public async Task<Result> Reply(int id, string replyContent)
        {
            var replyInfo = await this.GetById<ReplyInfoServiceModel>(id);

            // TODO add HTML content here
            await this.emailSender.SendEmailAsync(
                        replyInfo.Email,
                        $"Appartments Lilly Enquiery: {replyInfo.Title}",
                        $"Dear {replyInfo.Name}, /n {replyContent}");

            return await this.SetReplyedAsync(id, replyContent);
        }

        public async Task<Result> Ignore(int id)
        {
            return await this.SetReplyedAsync(id, "IGNORED");
        }

        private async Task<Result> SetReplyedAsync(int id, string replyContent)
        {
            var form = data
                .ContactFormEntries
                .FirstOrDefault(r => r.Id == id);

            if (form == null)
            {
                return $"Contact Request with ID: {id} does not exists.";
            }

            form.Reply = replyContent;
            form.IsReplyed = true;
            form.ReplyedOn = DateTime.UtcNow;

            this.data.ContactFormEntries.Update(form);
            await this.data.SaveChangesAsync();

            return true;
        }
    }
}
