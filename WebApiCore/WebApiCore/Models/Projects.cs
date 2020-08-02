using Microsoft.EntityFrameworkCore;
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
        public int Size { get; set; }
        public int Prio { get; set; }
        public bool Active { get; set; }
    }
}
