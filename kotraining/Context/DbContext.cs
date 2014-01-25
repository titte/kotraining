using kotraining.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace kotraining.Context
{
    public class DBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }
    }
}