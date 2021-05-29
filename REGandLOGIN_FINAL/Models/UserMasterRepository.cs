using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace REGandLOGIN_FINAL.Models
{
    public class UserMasterRepository : IDisposable
    {
        UserDBEntities context = new UserDBEntities();
        public tblNewUser ValidateUser(string username, string password)
        {
            return context.tblNewUsers.FirstOrDefault(user =>
            user.Email.Equals(username, StringComparison.OrdinalIgnoreCase)
            && user.Password == password);
        }
        public void Dispose()
        {
            context.Dispose();
        }
    }
}