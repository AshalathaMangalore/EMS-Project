namespace Empolyee_Mangement.Data.Models
{
    public  class ApplicationContext
    {
        public string CorrelationId { get; } = Guid.NewGuid().ToString();
        public int UserId { get; set; } = -1;
        public string UserEmail { get; set; } = null!;
        public bool SuppressDivisionFilters { get; set; }
        public bool SuppressSoftDeleteFilters { get; set; }
    }
}
