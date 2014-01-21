using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kotraining.Models
{
    public class Post
    {
        [JsonProperty(PropertyName= "postId")]
        public int PostId { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "slug")]
        public string Slug { get; set; }
        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }
    }
}