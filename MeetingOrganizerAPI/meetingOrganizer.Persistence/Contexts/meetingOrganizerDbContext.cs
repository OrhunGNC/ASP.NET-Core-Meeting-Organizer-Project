using meetingOrganizer.Domain.Entities;
using meetingOrganizer.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Persistence.Contexts
{
    public class meetingOrganizerDbContext:DbContext
    {
        public meetingOrganizerDbContext(DbContextOptions<meetingOrganizerDbContext> options):base(options) { }
        public DbSet<Personel> Personels {  get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                    _ => DateTime.UtcNow
                };
            }
            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
