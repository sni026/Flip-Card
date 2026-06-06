using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlipCardApi.Migrations
{
    /// <inheritdoc />
    public partial class SetFoundationForTechnicalCards : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Cards SET Foundation = 1 WHERE Technical = 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
