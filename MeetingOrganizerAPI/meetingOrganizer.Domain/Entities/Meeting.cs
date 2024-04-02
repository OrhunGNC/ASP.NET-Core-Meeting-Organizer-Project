using meetingOrganizer.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Domain.Entities
{
    public class Meeting:BaseEntity
    {
        public int PersonelId { get; set; }
        public Personel Personel { get; set; }
        public string MeetingTopic { get; set; }
        public DateTime MeetingDate { get; set; }
        public string MeetingEnd { get; set; }
        public string Participants { get; set; }
        

    }
}
