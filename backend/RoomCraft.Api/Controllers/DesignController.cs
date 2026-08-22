using Microsoft.AspNetCore.Mvc;
using RoomCraft.Api.Models;
using RoomCraft.Api.Data;

namespace RoomCraft.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DesignsController : ControllerBase
{
    private readonly DesignData _designData;
    public DesignsController(IConfiguration configuration)
    {
        string? connectionString = configuration.GetConnectionString("DefaultConnection");

        if(string.IsNullOrEmpty(connectionString))
        {
            throw new Exception("Veritabanı bağlantı bilgisi bulunamadı.");
        }
        _designData = new DesignData(connectionString);
    }

    [HttpGet]
    public ActionResult<List<Design>> GetAllDesigns()
    {
        List<Design> designs = _designData.GetAllDesigns();
        return Ok(designs);
    }

    [HttpGet("{id}")]
    public IActionResult GetDesignById(int id)
    {
        Design? design =_designData.GetDesignById(id);
        if (design == null)
        {
            return NotFound("Tasarım bulunamadı.");
        }
        return Ok(design);
    }

    [HttpPost]
    public IActionResult AddDesignI(Design design)
    {
        int newDesignId = _designData.AddDesign(design);

        if (newDesignId == 0)
        {
            return BadRequest("Tasarım eklenirken bir hata oluştu");
        }
        return Ok(new
        {
            id = newDesignId,
            message = "Tasarım başarıyla eklendi."
        });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateDesign(int id, Design design
    )
    {
        bool result = _designData.UpdateDesign(id, design);
        if (!result)
        {
            return NotFound("Güncellenecek tasarım bulunamadı.");
        }

        return Ok("Tasarım başarıyla güncellendi.");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteDesign(int id)
    {
        bool result = _designData.DeleteDesign(id);

        if (!result)
        {
            return NotFound("Silinecek tasarım bulunamadı");
        }
        return Ok("Tasarım başarıyla silindi.");
    }

    [HttpPost("complete")]
    public IActionResult CreateCompleteDesign(
        SaveDesignRequest request
    )
    {
        int newDesignId = _designData.SaveDesignWithFurniture(
            null,
            request.Design,
            request.FurnitureItems
        );

        if (newDesignId == 0)
        {
            return BadRequest("Tasarım ve Mobilyalar Kaydedilemedi.");
        }

        return Ok(new 
        { 
            id = newDesignId,
            message = "Tasarım ve Mobilyalar Başarıyla Kaydedildi." 
        });
    }

    [HttpPut("{id}/complete")]
    public IActionResult UpdateCompleteDesign(int id, SaveDesignRequest request)
    {
        int savedDesignId = _designData.SaveDesignWithFurniture(
                id,
                request.Design,
                request.FurnitureItems
            );
        if (savedDesignId == 0)
        {
            return BadRequest("Tasarım Güncellenemedi.");
        }

        return Ok(new
        {
            id = savedDesignId,
            message = "Tasarım başarıyla güncellendi."
        });
    }
}