using Microsoft.EntityFrameworkCore.Migrations;

namespace ApartmentsLilly.Server.Data.Migrations
{
    public partial class ChangeApartmentImageToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Apartments_ApartmentId1",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_ApartmentId1",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ApartmentId1",
                table: "Images");

            migrationBuilder.AddColumn<string>(
                name: "MainImageUrl",
                table: "Apartments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainImageUrl",
                table: "Apartments");

            migrationBuilder.AddColumn<int>(
                name: "ApartmentId1",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_ApartmentId1",
                table: "Images",
                column: "ApartmentId1",
                unique: true,
                filter: "[ApartmentId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Apartments_ApartmentId1",
                table: "Images",
                column: "ApartmentId1",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
