using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestsWebApp.Migrations
{
    /// <inheritdoc />
    public partial class CorrectAnswerInAnswers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<bool>(
                name: "isCorrectAnswer",
                table: "Answers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCorrectAnswer",
                table: "Answers");

        }
    }
}
