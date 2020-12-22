using Microsoft.EntityFrameworkCore.Migrations;

namespace ApartmentsLilly.Server.Data.Migrations
{
    public partial class UpdateUserProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_Images_ImageId",
                table: "Profiles");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_ImageId",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Profiles");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Profiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Profiles");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Profiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ImageId",
                table: "Profiles",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_ImageId",
                table: "Profiles",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_Images_ImageId",
                table: "Profiles",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
