using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kotraining.Models
{
    public class School
    {
        public int SchoolId { get; set; }
        public string Name { get; set; }
        public List<Class> Classes { get; set; }
    }
}