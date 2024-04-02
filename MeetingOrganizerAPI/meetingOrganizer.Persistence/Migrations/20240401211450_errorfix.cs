using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace meetingOrganizer.Persistence.Migrations
{
    public partial class errorfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PersonelMoney",
                table: "Personels",
                newName: "PersonelSalary");

            migrationBuilder.AlterColumn<string>(
                name: "MeetingEnd",
                table: "Meetings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PersonelSalary",
                table: "Personels",
                newName: "PersonelMoney");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "MeetingEnd",
                table: "Meetings",
                type: "time",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
