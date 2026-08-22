using Microsoft.Data.SqlClient;
using RoomCraft.Api.Models;

namespace RoomCraft.Api.Data;

public class FurnitureData
{
    private readonly string _connectionString;

    public FurnitureData(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<FurnitureItem> GetFurnitureByDesignId(int designId)
    {
        List<FurnitureItem> furnitureItems = new List<FurnitureItem>();

        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);

            string query = @"
                SELECT
                    Id,
                    DesignId,
                    CatalogId,
                    Name,
                    Type,
                    Category,
                    X,
                    Y,
                    Width,
                    Height,
                    Rotation,
                    Price,
                    ZIndex,
                    IsLocked,
                    WallSide
                FROM FurnitureItems
                WHERE DesignId = @DesignId
                ORDER BY ZIndex ASC
            ";

            using SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@DesignId", designId);

            connection.Open();

            using SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                FurnitureItem furniture = new FurnitureItem()
                {
                    Id = reader.GetInt32( reader.GetOrdinal("Id")),
                    DesignId = reader.GetInt32(reader.GetOrdinal("DesignId")),
                    CatalogId = reader.GetString(reader.GetOrdinal("CatalogId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Type = reader.GetString(reader.GetOrdinal("Type")),
                    Category = reader.IsDBNull(reader.GetOrdinal("Category"))
                        ? null
                        : reader.GetString(reader.GetOrdinal("Category")),

                    X = reader.GetDecimal(reader.GetOrdinal("X")),
                    Y = reader.GetDecimal( reader.GetOrdinal("Y")),

                    Width = reader.GetDecimal(reader.GetOrdinal("Width")),
                    Height = reader.GetDecimal(reader.GetOrdinal("Height")),
                    Rotation = reader.GetInt32(reader.GetOrdinal("Rotation")),
                    Price = reader.GetDecimal(reader.GetOrdinal("Price")),

                    ZIndex = reader.GetInt32(reader.GetOrdinal("ZIndex")),

                    IsLocked = reader.GetBoolean(reader.GetOrdinal("IsLocked")),
                    WallSide = reader.IsDBNull(reader.GetOrdinal("WallSide"))
                        ? null
                        : reader.GetString(reader.GetOrdinal("WallSide")),
                    };

                furnitureItems.Add(furniture);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Mobilyalar alınırken hata oluştu: {ex.Message}");
        }

        return furnitureItems;
    }

    public bool AddFurniture(FurnitureItem furniture)
    {
        try
        {
            using SqlConnection connection =new SqlConnection(_connectionString);

            string query = @"
                INSERT INTO FurnitureItems
                (
                    DesignId,
                    CatalogId,
                    Name,
                    Type,
                    Category,
                    X,
                    Y,
                    Width,
                    Height,
                    Rotation,
                    Price,
                    ZIndex,
                    IsLocked,
                    WallSide
                )
                VALUES
                (
                    @DesignId,
                    @CatalogId,
                    @Name,
                    @Type,
                    @Category,
                    @X,
                    @Y,
                    @Width,
                    @Height,
                    @Rotation,
                    @Price,
                    @ZIndex,
                    @IsLocked,
                    @WallSide
                )
            ";

            using SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@DesignId",furniture.DesignId );

            command.Parameters.AddWithValue("@CatalogId",furniture.CatalogId);

            command.Parameters.AddWithValue("@Name", furniture.Name );

            command.Parameters.AddWithValue("@Type",furniture.Type);

            command.Parameters.AddWithValue(
                "@Category",
                (object?)furniture.Category ?? DBNull.Value
            );

            command.Parameters.AddWithValue("@X",furniture.X);
            command.Parameters.AddWithValue("@Y",furniture.Y);

            command.Parameters.AddWithValue("@Width",furniture.Width);
            command.Parameters.AddWithValue("@Height",furniture.Height);

            command.Parameters.AddWithValue("@Rotation",furniture.Rotation);
            command.Parameters.AddWithValue("@Price",furniture.Price);

            command.Parameters.AddWithValue("@ZIndex",furniture.ZIndex);

            command.Parameters.AddWithValue("@IsLocked",furniture.IsLocked);

            command.Parameters.AddWithValue(
                "@WallSide",
                (object?)furniture.WallSide ?? DBNull.Value
            );

            connection.Open();

            int affectedRows = command.ExecuteNonQuery();

            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Mobilya eklenirken hata oluştu: {ex.Message}");
            return false;
        }
    }    

    public bool DeleteFurnitureByDesignId(int designId)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);
            string query = @"DELETE FROM FurnitureItems
                WHERE DesignId = @DesignId";
            using SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@DesignId", designId);
            connection.Open();
            command.ExecuteNonQuery();
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Tasarıma Ait Mobilyalar Silinirken Hata Oluştu: {ex.Message}");
            return false;
        }
    }
}