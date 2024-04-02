using meetingOrganizer.Application.Repositories;
using meetingOrganizer.Domain.Entities;
using meetingOrganizer.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Persistence.Repositories
{
    public class MeetingRepository:Repository<Meeting>,IMeetingRepository
    {
        public MeetingRepository(meetingOrganizerDbContext dbcontext) : base(dbcontext, dbcontext.Set<Meeting>())
        {
           
        }
    }
}
