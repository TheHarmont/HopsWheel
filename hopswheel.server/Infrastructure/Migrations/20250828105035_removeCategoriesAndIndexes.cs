using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class removeCategoriesAndIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prizes_Categories_CategoryId",
                schema: "public",
                table: "Prizes");

            migrationBuilder.DropTable(
                name: "Categories",
                schema: "public");

            migrationBuilder.DropIndex(
                name: "IX_Prizes_CategoryId",
                schema: "public",
                table: "Prizes");

            migrationBuilder.DropIndex(
                name: "IX_Prizes_NameNormalize",
                schema: "public",
                table: "Prizes");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                schema: "public",
                table: "Prizes");

            migrationBuilder.DropColumn(
                name: "NameNormalize",
                schema: "public",
                table: "Prizes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                schema: "public",
                table: "Prizes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NameNormalize",
                schema: "public",
                table: "Prizes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Categories",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NameNormalize = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "public",
                table: "Categories",
                columns: new[] { "Id", "Description", "IsActive", "IsDeleted", "Name", "NameNormalize" },
                values: new object[] { 1, null, true, false, "Без категории", "БЕЗ КАТЕГОРИИ" });

            migrationBuilder.CreateIndex(
                name: "IX_Prizes_CategoryId",
                schema: "public",
                table: "Prizes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Prizes_NameNormalize",
                schema: "public",
                table: "Prizes",
                column: "NameNormalize");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_NameNormalize",
                schema: "public",
                table: "Categories",
                column: "NameNormalize");

            migrationBuilder.AddForeignKey(
                name: "FK_Prizes_Categories_CategoryId",
                schema: "public",
                table: "Prizes",
                column: "CategoryId",
                principalSchema: "public",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
