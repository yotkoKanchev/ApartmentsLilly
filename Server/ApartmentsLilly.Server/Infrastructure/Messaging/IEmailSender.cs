namespace ApartmentsLilly.Server.Infrastructure.Messaging
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IEmailSender
    {
        Task SendEmailAsync(
            string to,
            string subject,
            string htmlContent,
            string from = WebConstants.SystemEmail,
            string fromName = WebConstants.SystemName,
            IEnumerable<EmailAttachment> attachments = null);
    }
}
