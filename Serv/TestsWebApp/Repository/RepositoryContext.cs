using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options) 
        :base(options)
        { }

        public DbSet<Test>? Tests { get; set; }
        public DbSet<Question>? Questions { get; set; }
    }
}
