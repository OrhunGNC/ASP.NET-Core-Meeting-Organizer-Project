using meetingOrganizer.Application.Repositories;
using meetingOrganizer.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace meetingOrganizer.Persistence.Repositories
{
    public class Repository<T>:IRepository<T> where T : class
    {
        private readonly meetingOrganizerDbContext _dbcontext;
        internal DbSet<T> _dbSet;
        public Repository(meetingOrganizerDbContext dbcontext, DbSet<T> dbSet)
        {
            _dbcontext = dbcontext;
            _dbSet = dbSet;
        }

        public void Add(T entity)
        {
            
            _dbSet.Add(entity);
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            if(filter != null){
                query = query.Where(filter);
            }
            if (includeProperties != null)
            {
                foreach(var item in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(item);
                }
            }
            return query.ToList();
                }

        public T GetFirstOrDefault(Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (includeProperties != null)
            {
                foreach (var item in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(item);
                }
            }
            return query.FirstOrDefault();
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }
    }
}
