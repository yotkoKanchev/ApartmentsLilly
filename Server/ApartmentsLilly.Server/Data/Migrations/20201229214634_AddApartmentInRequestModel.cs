using Microsoft.EntityFrameworkCore.Migrations;

namespace ApartmentsLilly.Server.Data.Migrations
{
    public partial class AddApartmentInRequestModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Apartments_ApartmentId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Rooms_RoomId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Apartments_ApartmentId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Bookings_BookingId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Apartments_ApartmentId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_BookingId",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "ApartmentId",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_BookingId",
                table: "Reviews",
                column: "BookingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_ApartmentId",
                table: "Requests",
                column: "ApartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Apartments_ApartmentId",
                table: "Bookings",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Rooms_RoomId",
                table: "Images",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Apartments_ApartmentId",
                table: "Requests",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Apartments_ApartmentId",
                table: "Reviews",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Bookings_BookingId",
                table: "Reviews",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Apartments_ApartmentId",
                table: "Rooms",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Apartments_ApartmentId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Rooms_RoomId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Apartments_ApartmentId",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Apartments_ApartmentId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Bookings_BookingId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Apartments_ApartmentId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_BookingId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Requests_ApartmentId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "ApartmentId",
                table: "Requests");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_BookingId",
                table: "Reviews",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Apartments_ApartmentId",
                table: "Bookings",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Rooms_RoomId",
                table: "Images",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Apartments_ApartmentId",
                table: "Reviews",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Bookings_BookingId",
                table: "Reviews",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Apartments_ApartmentId",
                table: "Rooms",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
