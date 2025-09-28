using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CategoryNameNormalize",
                schema: "public",
                table: "Categories",
                newName: "NameNormalize");

            migrationBuilder.RenameColumn(
                name: "CategoryName",
                schema: "public",
                table: "Categories",
                newName: "Name");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_CategoryNameNormalize",
                schema: "public",
                table: "Categories",
                newName: "IX_Categories_NameNormalize");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                schema: "public",
                table: "Categories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                schema: "public",
                table: "Categories",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                schema: "public",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                schema: "public",
                table: "Categories");

            migrationBuilder.RenameColumn(
                name: "NameNormalize",
                schema: "public",
                table: "Categories",
                newName: "CategoryNameNormalize");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "public",
                table: "Categories",
                newName: "CategoryName");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_NameNormalize",
                schema: "public",
                table: "Categories",
                newName: "IX_Categories_CategoryNameNormalize");
        }
    }
}
