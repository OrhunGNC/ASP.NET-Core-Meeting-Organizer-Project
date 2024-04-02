using meetingOrganizer.Application.Repositories;
using meetingOrganizer.Application.ViewModels;
using meetingOrganizer.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace meetingOrganizer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonelController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public PersonelController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var personelList = _uow.PersonelRepo.GetAll();
                return Ok(personelList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var personel = _uow.PersonelRepo.GetFirstOrDefault(x => x.Id == id);
            if (personel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(personel);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] PersonelVM personelVM)
        {
            var personelEntity = new Personel
            {
                CreatedDate = DateTime.Now,
                PersonelName=personelVM.PersonelName,
                PersonelTitle=personelVM.PersonelTitle,
                PersonelSalary = personelVM.PersonelSalary,
            };
            _uow.PersonelRepo.Add(personelEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] PersonelVM personelVM)
        {
            var personelEntity = new Personel
            {
                Id = personelVM.Id,
                CreatedDate = personelVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                PersonelName = personelVM.PersonelName,
                PersonelTitle = personelVM.PersonelTitle,
                PersonelSalary = personelVM.PersonelSalary,
            };
            _uow.PersonelRepo.Update(personelEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var personel = _uow.PersonelRepo.GetFirstOrDefault(x => x.Id == id);
            if (personel == null)
            {
                return BadRequest();
            }
            else
            {
                _uow.PersonelRepo.Remove(personel);
                _uow.Save();
                return NoContent();
            }
        }
    }
}
