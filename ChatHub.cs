using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RealTimeChat.Models;

namespace RealTimeChat
{
    public class ChatHub : Hub
    {
        private readonly UserDbContext _context;

        private User user;
        private MessageModel Msg;

        public ChatHub(UserDbContext context)
        {
            _context = context;
        }

        public void getId(string sender)
        {
            Console.WriteLine(sender);
            user = _context.Users.SingleOrDefault(u => u.UserName == sender);
            //user.ConnId = Context.ConnectionId;

            _context.Users.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void setStatus(string sender, Boolean status)
        {
            user = _context.Users.SingleOrDefault(u => u.UserName == sender);
            //user.Connected = true;

            _context.Users.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void removeStatus(string sender)
        {
            user = _context.Users.SingleOrDefault(u => u.UserName == sender);
            //user.Connected = false;

            _context.Users.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public async Task Send(string sender, string receiver, string senderConnId, string receiverId, string message, string date)
        {


            await Clients.Client(senderConnId).SendAsync("Send", sender, message, date);
            await Clients.Client(receiverId).SendAsync("Send", sender, message, date);


        }

        public async Task sendToMe(string sender, string senderConnId, string msg, string date)
        {
            await Clients.Client(senderConnId).SendAsync("sendToMe", sender, msg, date);
        }
    }
}
