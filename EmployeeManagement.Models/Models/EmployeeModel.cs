namespace EmployeeManagement.Models.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int ProjectId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DateCreated { get; set; }
        public string DateModified { get; set; }

        public string? CompanyName { get; set; }
        public string? CompanyPhone { get; set; }
        public string? ProjectName { get; set; }
    }
}
