namespace RoomCraft.Api.Models;

public class Design
{
    public int Id { get; set;}
    public string DesignName { get; set;} = string.Empty;
    public string RoomType { get; set;} = string.Empty;

    public decimal RoomWidth { get; set;}
    public decimal RoomHeight { get; set;}

    public string? WallColor { get; set;}
    public string? FloorColor { get; set;}

    public decimal Budget { get; set;}
    public decimal TotalCost { get; set;}

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set;}
}