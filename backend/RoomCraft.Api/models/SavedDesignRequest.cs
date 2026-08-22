namespace RoomCraft.Api.Models;

public class SaveDesignRequest
{
    public Design Design { get; set; } = new Design();

    public List<FurnitureItem> FurnitureItems { get; set; } = new List<FurnitureItem>();
}