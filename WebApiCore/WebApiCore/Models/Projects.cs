using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiCore.Models
{
    public class ProjectsContext : DbContext
    {
        public ProjectsContext()
        {
        }

        public DbSet<Projects> Projects { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=projects;Username=postgres;Password=mk1234");
    }

    public class Projects
    {
        public Projects()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int PlannedSales { get; set; }
        public int PlannedProfit { get; set; }
        public int EstimatedCosts { get; set; }
        public int CostSavings { get; set; }
        public int PaybackPeriod { get; set; }
        public double Rentability { get; set; }
        public int StaffCosts { get; set; }
        public int StaffHours { get; set; }
        public int EmployeeNumber { get; set; }
        public int EmployeeSales { get; set; }
        public int AverageHourlyRate { get; set; }
        public int ProfitPerHour { get; set; }
        public int TimeExpenditure { get; set; }
        public DateTime EndDate { get; set; }
        public int CustomerPriority { get; set; }
        public int TimeBuffer { get; set; }
        public int RiskExpectedValue { get; set; }
        public int Ranking { get; set; }
        public bool Archived { get; set; }
    }
}

