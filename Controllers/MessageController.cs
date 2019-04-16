using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealTimeChat.Models;

namespace RealTimeChat.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly UserDbContext _context;

        public MessageController(UserDbContext context)
        {
            _context = context;
        }

        // GET: api/Message
        [HttpGet]
        public IEnumerable<MessageModel> Get()
        {
            return _context.Messages;
        }

        // GET: api/Message/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var messageModel = await _context.Messages.FindAsync(id);

            if (messageModel == null)
            {
                return NotFound();
            }

            return Ok(messageModel);
        }

        // PUT: api/Message/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] MessageModel messageModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != messageModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(messageModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Message
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MessageModel messageModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Messages.Add(messageModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessageModel", new { id = messageModel.Id }, messageModel);
        }

        // DELETE: api/Message/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var messageModel = await _context.Messages.FindAsync(id);
            if (messageModel == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(messageModel);
            await _context.SaveChangesAsync();

            return Ok(messageModel);
        }

        private bool MessageModelExists(int id)
        {
            return _context.Messages.Any(e => e.Id == id);
        }
    }
}
