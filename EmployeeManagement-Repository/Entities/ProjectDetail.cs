using System;
using System.Collections.Generic;

#nullable disable

namespace EmployeeManagement_Repository.Entities
{
    public partial class ProjectDetail
    {
        public ProjectDetail()
        {
            Employees = new HashSet<Employee>();
        }

        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDesc { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
