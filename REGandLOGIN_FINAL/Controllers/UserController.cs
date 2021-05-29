using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using REGandLOGIN_FINAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;

namespace REGandLOGIN_FINAL.Controllers
{
    public class UserController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("api/user/forall")]
        public IHttpActionResult Get()
        {
            return Ok("Now server time is: " + DateTime.Now.ToString());

        }

        [Authorize]
        [HttpGet]
        [Route("api/user/authenticate")]
        public IHttpActionResult GetForAuthenticate()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return Ok("Hello " + identity.Name + "! Please click authorized to see your profile details.");
        }

        [Authorize]
        [HttpGet]
        [Route("api/user/authorize")]
        public tblNewUser GetUserDetailsAfterAuth()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            tblNewUser userdata = new tblNewUser
            {
                FirstName = System.Security.Claims.ClaimsPrincipal.Current.FindFirst(ClaimTypes.Name).Value,
                LastName = System.Security.Claims.ClaimsPrincipal.Current.FindFirst(ClaimTypes.GivenName).Value,
                Email = System.Security.Claims.ClaimsPrincipal.Current.FindFirst(ClaimTypes.Email).Value,
                Contact_Number = System.Security.Claims.ClaimsPrincipal.Current.FindFirst(ClaimTypes.MobilePhone).Value,
                LoggedON = (DateTime.Now.ToString())
            };
            return userdata;
        }


        [Authorize]
        [HttpGet]
        [Route("api/user/carparkavailability")]
        public async System.Threading.Tasks.Task<IHttpActionResult> GetCarParkDataAsync()
        {
            var result = "";
            var url = "https://api.data.gov.sg/v1/transport/carpark-availability";
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(url))
                {
                    using (var content = response.Content)
                    {
                        result = await content.ReadAsStringAsync();
                    }
                }
                return Ok(JsonConvert.DeserializeObject<object>(result));
            }
        }


        UserDBEntities dbcontext = new UserDBEntities();
        [ResponseType(typeof(tblNewUser))]
        [HttpPost]
        [Route("api/user/SaveUser")]
        public HttpResponseMessage SaveUser(tblNewUser newuser)
        {
            int result = 0;
            try
            {
                dbcontext.tblNewUsers.Add(newuser);
                dbcontext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [ResponseType(typeof(tblNewUser))]
        [HttpGet]
        [Route("api/user/GetUsers")]
        public List<tblNewUser> GetUsers()
        {
            List<tblNewUser> user = null;
            try
            {
                user = dbcontext.tblNewUsers.ToList();

            }
            catch (Exception e)
            {
                user = null;
            }
            return user;
        }





































    }
}
