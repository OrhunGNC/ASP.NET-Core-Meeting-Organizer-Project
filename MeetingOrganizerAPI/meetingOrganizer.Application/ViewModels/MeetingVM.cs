using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Application.ViewModels
{
    public class MeetingVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int PersonelId { get; set; }
        public string MeetingTopic { get; set; }
        public DateTime MeetingDate { get; set; }
        public string MeetingEnd { get; set; }
        public string Participants { get; set; }
    }
}
