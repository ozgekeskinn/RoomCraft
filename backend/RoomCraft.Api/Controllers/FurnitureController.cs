using Microsoft.AspNetCore.Mvc;
using RoomCraft.Api.Data;
using RoomCraft.Api.Models;

namespace RoomCraft.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FurnitureController : ControllerBase
{
    private readonly FurnitureData _furnitureData;

    public FurnitureController(IConfiguration configuration)
    {
        string? connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new Exception("Veritabanı bağlantı bilgisi bulunamadı.");
        }
        _furnitureData = new FurnitureData(connectionString);
    }


    [HttpGet("design/{designId}")]
    public ActionResult<List<FurnitureItem>>
        GetFurnitureByDesignId(int designId)
    {
        List<FurnitureItem> furnitureItems = _furnitureData.GetFurnitureByDesignId(designId);

        return Ok(furnitureItems);
    }

    [HttpPost]
    public IActionResult AddFurniture(FurnitureItem furniture)
    {
        bool result = _furnitureData.AddFurniture(furniture);

        if (!result)
        {
            return BadRequest("Mobilya eklenirken bir hata oluştu.");
        }

        return Ok("Mobilya başarıyla eklendi.");
    }

    [HttpDelete("design/{designId}")]
    public IActionResult DeleteFurnitureByDesignId(int designId)
    {
        bool result = _furnitureData.DeleteFurnitureByDesignId(designId);

        if (!result)
        {
            return BadRequest("Tasarıma Ait Mobilyalar Silinemedi.");
        }

        return Ok("Tasarıma Ait Mobilyalar Başarıyla Silindi.");
    }
}