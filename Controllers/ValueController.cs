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
    public class ValueController : ControllerBase
    {
        private readonly UserDbContext _context;

        public ValueController(UserDbContext context)
        {
            _context = context;
        }

        // GET: api/Value
        [HttpGet]
        [Route("Get")]
        public IEnumerable<User> Get()
        {
            return _context.Users;
        }

        // GET: api/Value/5

        [HttpGet]
        [Route("Get/{name}")]
        public async Task<IActionResult> Get(string name)
        {
            var user = await _context.Users.SingleOrDefaultAsync(m => m.UserName == name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Value/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Value
        [HttpPost]
        [Route("Post")]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // DELETE: api/Value/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
