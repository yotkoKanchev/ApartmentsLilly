using Microsoft.EntityFrameworkCore.Migrations;

namespace ApartmentsLilly.Server.Data.Migrations
{
    public partial class UpdateRequestModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChildrenCount",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "InfantsCount",
                table: "Requests");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Requests",
                newName: "To");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Requests",
                newName: "From");

            migrationBuilder.RenameColumn(
                name: "AdultsCount",
                table: "Requests",
                newName: "Infants");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalInfo",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Adults",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Children",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Confirmation",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalInfo",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Adults",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Children",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Confirmation",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Requests");

            migrationBuilder.RenameColumn(
                name: "To",
                table: "Requests",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "Infants",
                table: "Requests",
                newName: "AdultsCount");

            migrationBuilder.RenameColumn(
                name: "From",
                table: "Requests",
                newName: "EndDate");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "ChildrenCount",
                table: "Requests",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InfantsCount",
                table: "Requests",
                type: "int",
                nullable: true);
        }
    }
}
