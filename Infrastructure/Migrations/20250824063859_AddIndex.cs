using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserNameNormalize",
                schema: "public",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameNormalize",
                schema: "public",
                table: "Prizes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CategoryNameNormalize",
                schema: "public",
                table: "Categories",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserNameNormalize",
                schema: "public",
                table: "Users",
                column: "UserNameNormalize");

            migrationBuilder.CreateIndex(
                name: "IX_Prizes_NameNormalize",
                schema: "public",
                table: "Prizes",
                column: "NameNormalize");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CategoryNameNormalize",
                schema: "public",
                table: "Categories",
                column: "CategoryNameNormalize");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_UserNameNormalize",
                schema: "public",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Prizes_NameNormalize",
                schema: "public",
                table: "Prizes");

            migrationBuilder.DropIndex(
                name: "IX_Categories_CategoryNameNormalize",
                schema: "public",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "UserNameNormalize",
                schema: "public",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NameNormalize",
                schema: "public",
                table: "Prizes");

            migrationBuilder.DropColumn(
                name: "CategoryNameNormalize",
                schema: "public",
                table: "Categories");
        }
    }
}
