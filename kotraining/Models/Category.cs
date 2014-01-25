using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kotraining.Models
{
    public class Category
    {
        [JsonProperty(PropertyName = "categoryId")]
        public int CategoryId { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "nodes")]
        public IEnumerable<Category> Nodes { get; set; }
    }
}