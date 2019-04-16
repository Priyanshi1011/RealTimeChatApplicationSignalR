using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace RealTimeChat.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConnectionId { get; set; }
        public bool Connected { get; set; }
    }
}
