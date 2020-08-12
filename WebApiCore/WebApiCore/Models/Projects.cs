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
        //KPI's
        public int PlannedSales { get; set; }//e
        public int PlannedProfit { get; set; }//e
        public int EstimatedCosts { get; set; }
        public int CostSavings { get; set; }//i
        public int PaybackPeriod { get; set; }//i
        public double Rentability { get; set; }//e
        public int StaffCosts { get; set; }
        public int StaffHours { get; set; }
        public int EmployeeNumber { get; set; }
        public int EmployeeSales { get; set; }//e
        public int AverageHourlyRate { get; set; }
        public int ProfitPerHour { get; set; }//e
        public int TimeExpenditure { get; set; }
        public DateTime EndDate { get; set; }
        public int CustomerPriority { get; set; }//e
        public int TimeBuffer { get; set; }
        public int RiskExpectedValue { get; set; }
        public int Ranking { get; set; }
        public bool Archived { get; set; }
        //Bewegungsdaten
        public string ProjectLeader { get; set; }
        public string ProjectMembers { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string Goal { get; set; }
        //Stammdaten
        public string CustomerName { get; set; } //e
        public string ContactPerson { get; set; }//e
        public string Address { get; set; }//e
        public string BusinessField { get; set; }//e
        public string Client { get; set; }//i
        public string Department { get; set; }//i
        public string Site { get; set; }//i
        public string PhoneNumber { get; set; }
        public string EMail { get; set; }


    }
}