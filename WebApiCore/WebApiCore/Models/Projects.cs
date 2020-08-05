using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiCore.Models
{
    public class ProjectsContext : DbContext
    {
        //public ProjectsContext(DbContextOptions<ProjectsContext> options) : base(options)
        //{
        //}

        public ProjectsContext()
        {
        }

        public DbSet<Projects> Projects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=projects;Username=postgres;Password=1234");
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
        public int StaffCosts { get; set; }
        public int StaffHours { get; set; }
        public int EmployeeNumber { get; set; }
        public int TimeExpenditure { get; set; }
        public DateTime EndDate { get; set; }
        public int CustomerPriority { get; set; }
        public int CustomerSales { get; set; }
    }
}
