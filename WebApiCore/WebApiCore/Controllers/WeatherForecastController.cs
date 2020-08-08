using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        //private static readonly string[] Summaries = new[]
        //{
        //    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        //};

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}

        [HttpPost("deleteProjects/")]
        public IEnumerable<Projects> DeleteProject(Projects projects)
        {
            using (var context = new ProjectsContext())
            {
                context.Remove(projects);
                context.SaveChanges();
            }

            return new List<Projects> { projects };
        }

        [HttpGet("getProjects")]
        public IEnumerable<Projects> GetProjects()
        {
            var projects = new List<Projects>();
            using (var context = new ProjectsContext())
            {
                projects = context.Projects.ToList();
            }
            return projects;
        }

        [HttpPost("addProjects/")]
        public IEnumerable<Projects> AddProject(Projects projects)
        {
            projects.ProjectId = 0;
            using (var context = new ProjectsContext())
            {
                context.Add(projects);
                context.SaveChanges();
            }

            return new List<Projects> { projects };
        }

        [HttpPost("updateProjects/")]
        public IEnumerable<Projects> updateProject(Projects projects)
        {
            using (var context = new ProjectsContext())
            {
                context.Update(projects);
                context.SaveChanges();
            }

            return new List<Projects> { projects };
        }

        [HttpPost("login/")]
        public IActionResult login(Users user)
        {
            var successful = false;
            Users foundUser = user;
            Roles role = null;
            var error = "";
            using (var context = new ProjectsContext())
            {
                var users = context.Users.Where(u => u.Username == user.Username && u.Password == user.Password).ToList();
                if (users.Count() == 1)
                {
                    foundUser = users.First();
                    var roles = context.Roles.Where(r => r.RoleId == foundUser.RoleId).ToList();
                    if (roles.Count() == 1)
                    {
                        role = roles.First();
                        successful = true;
                    }
                    else
                    {
                        error = "Keine Role für den Benutzer gefunden!";
                    }
                }
                else
                {
                    error = "Password oder Username Falsch!";
                }
            }

            return Ok(new { successful, foundUser, role, error });
        }

        [HttpPost("uploadProjects/")]
        public async Task<IActionResult> uploadProject(IFormFile file)
        {
            long size = file.Length;
            var projectCount = 0;
            var error = "";
            //todo prüfen ob gültige datei
            var result = new StringBuilder();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                {
                    result.AppendLine(await reader.ReadLineAsync());
                }
            }

            //if (file.Length > 0)
            //{
            //    var filePath = Path.GetTempFileName();

            //    using (var stream = System.IO.File.Create(filePath))
            //    {
            //        await file.CopyToAsync(stream);
            //    }
            //}

            try
            {
                //todo: Upload mit richtiger Json datei testen
                var myJsonObject = JsonConvert.DeserializeObject<List<Projects>>(result.ToString());
                //todo: add or Update to database
            }
            catch (System.Exception e)
            {
                return Ok(new { projectCount, size, error = "Fehler beim Deserializieren der Json Datei. Ungültige Datei." });
            }
            
            return Ok(new { projectCount, size, error });
        }
    }


}
