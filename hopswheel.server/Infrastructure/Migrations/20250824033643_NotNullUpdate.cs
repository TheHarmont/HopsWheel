using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NotNullUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prizes_Categories_CategoryId",
                schema: "public",
                table: "Prizes");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                schema: "public",
                table: "Prizes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prizes_Categories_CategoryId",
                schema: "public",
                table: "Prizes");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                schema: "public",
                table: "Prizes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Prizes_Categories_CategoryId",
                schema: "public",
                table: "Prizes",
                column: "CategoryId",
                principalSchema: "public",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
