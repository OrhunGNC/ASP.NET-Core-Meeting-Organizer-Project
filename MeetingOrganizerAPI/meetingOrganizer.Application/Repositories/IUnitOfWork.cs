using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Application.Repositories
{
    public interface IUnitOfWork:IDisposable
    {
        public IPersonelRepository PersonelRepo { get; }
        public IMeetingRepository MeetingRepo { get; }
        void Save();
    }
}
