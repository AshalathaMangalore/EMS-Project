﻿using EmployeeManagement_Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement_Repository
{
    public class ProjectRepository
    {

        private readonly EmployeeManagementContext dbContext;

        public ProjectRepository()
        {
            this.dbContext = new EmployeeManagementContext();
            dbContext = new EmployeeManagementContext();
        }

        public async Task CreateProject(ProjectDetail project)
        {
            dbContext.ProjectDetails.Add(project);
            await dbContext.SaveChangesAsync();
        }
        public async Task<List<ProjectDetail>> GetAllProject()
        {
            
            return dbContext.ProjectDetails.ToList();
        }

        public async Task<ProjectDetail> GetByProjectId(int id)
        {
            var project = dbContext.ProjectDetails.FirstOrDefault(p => p.ProjectId == id);
            return project;
        }
    }
}