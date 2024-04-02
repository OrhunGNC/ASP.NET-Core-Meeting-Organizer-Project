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
    public class PersonelRepository:Repository<Personel>,IPersonelRepository
    {
        public PersonelRepository(meetingOrganizerDbContext context) : base(context, context.Set<Personel>())
        {

        }
    }
}
