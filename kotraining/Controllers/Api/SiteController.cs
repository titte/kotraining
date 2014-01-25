using kotraining.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace kotraining.Controllers.Api
{
    public class SiteController : ApiController
    {
        public HttpResponseMessage GetCategories()
        {
            var locations = new Category
            {
                CategoryId = 1,
                Title = "Sidrot",
                Nodes = new Category[]{
                    new Category{
                        CategoryId = 2,
                        Title = "Programmering",
                        Nodes = new Category[]{
                            new Category{
                                CategoryId = 3,
                                Title = "Frontend"
                            },
                            new Category {
                                CategoryId = 4,
                                Title = "Backend"
                            }
                        }
                    },
                    new Category{
                        CategoryId = 5,
                        Title = "Djur",
                        Nodes = new Category[]{
                            new Category{
                                CategoryId = 6,
                                Title = "Kattposter"
                            },
                            new Category {
                                CategoryId = 7,
                                Title = "Hundposter"
                            }
                        }
                    }
                }
            };

            return Request.CreateResponse<Category>(locations);
        }
    }
}
