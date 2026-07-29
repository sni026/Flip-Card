using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlipCardApi.Migrations
{
    public partial class AddScenarioToCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Scenario",
                table: "Cards",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Scenario",
                table: "Cards");
        }
    }
}
