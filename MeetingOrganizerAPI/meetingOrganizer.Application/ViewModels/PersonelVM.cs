using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Application.ViewModels
{
    public class PersonelVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string PersonelName { get; set; }
        public string PersonelTitle { get; set; }
        public decimal PersonelSalary { get; set; }
    }
}
