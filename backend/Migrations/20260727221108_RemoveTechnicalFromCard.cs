using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlipCardApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTechnicalFromCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Technical",
                table: "Cards");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Technical",
                table: "Cards",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
