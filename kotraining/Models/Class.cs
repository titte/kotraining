using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kotraining.Models
{
    public class Class
    {
        public int ClassId { get; set; }
        public string Name { get; set; }
        public List<Student> Students { get; set; }
    }
}