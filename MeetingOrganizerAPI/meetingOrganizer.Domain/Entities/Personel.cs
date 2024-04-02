    using meetingOrganizer.Domain.Entities.Common;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace meetingOrganizer.Domain.Entities
    {
        public class Personel:BaseEntity
        {
            public string PersonelName { get; set; }
            public string PersonelTitle {  get; set; }
            public decimal PersonelSalary { get; set; }
        public ICollection<Meeting> MeetingEntities { get; set; }
        }
    }
