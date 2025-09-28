using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMaxUses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrizeUsages",
                schema: "public");

            migrationBuilder.DropColumn(
                name: "PrizeCategoryAtTime",
                schema: "public",
                table: "Spins");

            migrationBuilder.DropColumn(
                name: "MaxUses",
                schema: "public",
                table: "Prizes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PrizeCategoryAtTime",
                schema: "public",
                table: "Spins",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxUses",
                schema: "public",
                table: "Prizes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PrizeUsages",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PrizeId = table.Column<Guid>(type: "uuid", nullable: false),
                    DropsNumber = table.Column<int>(type: "integer", nullable: false),
                    UsageDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrizeUsages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrizeUsages_Prizes_PrizeId",
                        column: x => x.PrizeId,
                        principalSchema: "public",
                        principalTable: "Prizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrizeUsages_PrizeId",
                schema: "public",
                table: "PrizeUsages",
                column: "PrizeId");
        }
    }
}
