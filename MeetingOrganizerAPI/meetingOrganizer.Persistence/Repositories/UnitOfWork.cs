using meetingOrganizer.Application.Repositories;
using meetingOrganizer.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Persistence.Repositories
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly meetingOrganizerDbContext _context;
        public UnitOfWork(meetingOrganizerDbContext context)
        {
            _context = context;
        }
        public IMeetingRepository MeetingRepo => new MeetingRepository(_context);
        public IPersonelRepository PersonelRepo => new PersonelRepository(_context);
        public void Dispose()
        {
            _context.Dispose();
        }
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
