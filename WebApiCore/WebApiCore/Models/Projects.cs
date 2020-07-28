using Microsoft.EntityFrameworkCore;

namespace WebApiCore.Models
{
    public class ProjectsContext : DbContext
    {
        public ProjectsContext(DbContextOptions<ProjectsContext> options) : base(options)
        {
        }

        public DbSet<Projects> ProjectList { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=projects;Username=postgres;Password=xxxx");
    }

    public class Projects
    {
        public Projects()
        {
        }
        public Projects(int projectId, string projectName)
        {
            ProjectId = projectId;
            ProjectName = projectName;
        }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
    }
}
