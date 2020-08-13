using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;

        public ProjectController(ILogger<ProjectController> logger)
        {
            _logger = logger;
        }

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

        [HttpGet("getInternalProjects")]
        public IEnumerable<Projects> GetInternalProjects()
        {
            var projects = new List<Projects>();
            using (var context = new ProjectsContext())
            {
                projects = context.Projects.Where(p => p.PlannedSales == 0).ToList();
            }
            return projects;
        }

        [HttpGet("getExternalProjects")]
        public IEnumerable<Projects> GetExternalProjects()
        {
            var projects = new List<Projects>();
            using (var context = new ProjectsContext())
            {
                projects = context.Projects.Where(p => p.PlannedSales != 0).ToList();
            }
            return projects;
        }


        [HttpPost("addProjects/")]
        public IEnumerable<Projects> AddProject(Projects projects)
        {
            projects.ProjectId = 0;
            calculateKPI(projects);
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
            calculateKPI(projects);
            using (var context = new ProjectsContext())
            {
                context.Update(projects);
                context.SaveChanges();
            }

            return new List<Projects> { projects };
        }

        [HttpPost("getOneProject/")]
        public IEnumerable<Projects> getOneProject(int projectID)
        {

            var projects = new List<Projects>();
            using (var context = new ProjectsContext())
            {
                projects = context.Projects.Where(p => p.ProjectId != projectID).ToList();
            }
            return projects;
        }

        public void calculateKPI(Projects projects)
        {
            var financeKPI = 0;
            var employeeKPI = 0;
            if (projects.StaffHours != 0)
            {
                projects.EmployeeSales = projects.PlannedSales / projects.StaffHours;
                projects.AverageHourlyRate = projects.StaffCosts / projects.StaffHours;
            }
            else
            {
                projects.EmployeeSales = 0;
                projects.AverageHourlyRate = 0;
            }
            projects.ProfitPerHour = projects.EmployeeSales - projects.AverageHourlyRate;
            projects.TimeBuffer = (projects.EndDate - DateTime.Now.AddDays(projects.TimeExpenditure)).Days;
            if (projects.PlannedSales == 0)
            {
                if(projects.CostSavings != 0)
                {
                    projects.PaybackPeriod = projects.EstimatedCosts / projects.CostSavings;
                    financeKPI = ((1 / projects.PaybackPeriod) * 200) * 5 * 4;
                }
                else
                {
                    projects.PaybackPeriod = 0;
                    financeKPI = 0;
                }
            }
            else
            {
                
                projects.PlannedProfit = projects.PlannedSales - projects.EstimatedCosts;
                if (projects.PlannedSales != 0)
                {
                    projects.Rentability = ((double)(projects.PlannedProfit) / projects.PlannedSales) * 100;
                }
                else
                {
                    projects.Rentability = 0;
                }

                financeKPI = (int)(projects.Rentability * 5 * 4);
                employeeKPI = projects.ProfitPerHour * 5 * 4;
            }
            var projectKPI = (projects.TimeBuffer * 3) + (projects.CustomerPriority * 5) * 3;
            var risksKPI = projects.RiskExpectedValue * 5 * 3;
            projects.Rentability = (int)projects.Rentability;
            projects.Ranking = projectKPI + financeKPI + employeeKPI - risksKPI;
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
            IList<ValidationError> errors;
            var jsonSchema = @"{
                                'description': '´projects',
                                'type': 'array',
                                'items': {
                                    'type': 'object',
                                    'properties':{
                                        'projectId':{'type':'number'},
                                        'projectName':{'type':'string'},
                                        'plannedSales':{'type':'number'},
                                        'estimatedCosts':{'type':'number'},
                                        'costSavings':{'type':'number'},
                                        'staffCosts':{'type':'number'},
                                        'staffHours':{'type':'number'},
                                        'employeeNumber':{'type':'number'},
                                        'timeExpenditure':{'type':'number'},
                                        'endDate':{'type':'string'},
                                        'customerPriority':{'type':'number'}
                                        'riskExpectedValue':{'type':'number'},
                                    },
                                    'additionalProperties':false,
                                    'required':[
                                                'projectId',
                                                'projectName',
                                                'plannedSales',
                                                'costSavings',
                                                'estimatedCosts',
                                                'staffCosts',
                                                'staffHours',
                                                'employeeNumber',
                                                'timeExpenditure',
                                                'endDate',
                                                'customerPriority',
                                                'riskExpectedValue'
                                               ],
                                },
                              }";
            var schema = JSchema.Parse(jsonSchema);
            //todo prüfen ob gültige datei
            var result = new StringBuilder();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                {
                    result.AppendLine(await reader.ReadLineAsync());
                }
            }
            JArray jprojects = JArray.Parse(result.ToString());
            var valid = jprojects.IsValid(schema, out errors);
            if (valid)
            {
                var projectsList = jprojects.ToObject<List<Projects>>();
                foreach (var project in projectsList)
                {
                    using (var context = new ProjectsContext())
                    {
                        context.Update(project);
                        context.SaveChanges();
                    }
                    projectCount++;
                }
                return Ok(new { projectCount, size });
            }
            else
            {
                foreach (var error in errors)
                {
                    Console.WriteLine(error.ToString());
                }
                return BadRequest(new { projectCount, size, errors });
            }
        }
    }


}
