using meetingOrganizer.Application.Repositories;
using meetingOrganizer.Application.ViewModels;
using meetingOrganizer.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace meetingOrganizer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public MeetingController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var meetingList = _uow.MeetingRepo.GetAll();
                return Ok(meetingList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var meeting = _uow.MeetingRepo.GetFirstOrDefault(x => x.Id == id);
            if (meeting == null) {
                return NotFound();
            }
            else
            {
                return Ok(meeting);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] MeetingVM meetingVM)
        {
            var meetingEntity = new Meeting
            {
                CreatedDate = DateTime.Now,
                PersonelId = meetingVM.PersonelId,
                MeetingTopic = meetingVM.MeetingTopic,
                MeetingDate=meetingVM.MeetingDate,
                MeetingEnd = meetingVM.MeetingEnd,
                Participants = meetingVM.Participants,
            };
            _uow.MeetingRepo.Add(meetingEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] MeetingVM meetingVM)
        {
            var meetingEntity = new Meeting
            {
                Id = meetingVM.Id,
                CreatedDate = meetingVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                PersonelId = meetingVM.PersonelId,
                MeetingTopic = meetingVM.MeetingTopic,
                MeetingDate = meetingVM.MeetingDate,
                MeetingEnd = meetingVM.MeetingEnd,
                Participants = meetingVM.Participants,
            };
            _uow.MeetingRepo.Update(meetingEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var meeting = _uow.MeetingRepo.GetFirstOrDefault(x=>x.Id==id);
            if (meeting == null)
            {
                return BadRequest();
            }
            else
            {
                _uow.MeetingRepo.Remove(meeting);
                _uow.Save();
                return NoContent();
            }
        }
    }
}
