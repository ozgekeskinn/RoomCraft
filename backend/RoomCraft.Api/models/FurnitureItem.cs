namespace RoomCraft.Api.Models;

public class FurnitureItem
{
    public int Id { get; set; }
    public int DesignId { get; set; }
    public string CatalogId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string? Category { get; set; }
    public decimal X { get; set; }
    public decimal Y { get; set; }
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public int Rotation { get; set; }
    public decimal Price { get; set; }
    public int ZIndex { get; set; }
    public bool IsLocked { get; set; }
    public string? WallSide { get; set; }
}