using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using kotraining.Models;
using kotraining.Context;

namespace kotraining.Controllers.Api
{
    public class BlogPostController : ApiController
    {
        private DBContext db = new DBContext();

        // GET api/BlogPost
        public IQueryable<Post> GetPosts()
        {
            return db.Posts.OrderByDescending(p => p.CreatedOn);
        }

        // GET api/BlogPost/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT api/BlogPost/5
        public IHttpActionResult PutPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (post.PostId <= 0)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(post.PostId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/BlogPost
        [ResponseType(typeof(Post))]
        public IHttpActionResult PostPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            post.CreatedOn = DateTime.Now;
            db.Posts.Add(post);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = post.PostId }, post);
        }

        // DELETE api/BlogPost/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Posts.Count(e => e.PostId == id) > 0;
        }
    }
}