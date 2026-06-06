using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlipCardApi.Migrations
{
    /// <inheritdoc />
    public partial class AddFoundationToCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Foundation",
                table: "Cards",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Foundation",
                table: "Cards");
        }
    }
}
