using Microsoft.Data.SqlClient;
using RoomCraft.Api.Models;

namespace RoomCraft.Api.Data;

public class DesignData
{
    private readonly string _connectionString;

    public DesignData(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<Design> GetAllDesigns()
    {
        List<Design> designs = new List<Design>();
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);
            string query = @"
                SELECT
                    Id,
                    DesignName,
                    RoomType,
                    RoomWidth,
                    RoomHeight,
                    WallColor,
                    FloorColor,
                    Budget,
                    TotalCost,
                    CreatedAt,
                    UpdatedAt
                FROM Designs
                ORDER BY UpdatedAt DESC
            ";

            using SqlCommand command = new SqlCommand(query, connection);

            connection.Open();
            using SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Design design = new Design()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    DesignName = reader.GetString(reader.GetOrdinal("DesignName")),
                    RoomType = reader.GetString(reader.GetOrdinal("RoomType")),

                    RoomWidth = reader.GetDecimal(reader.GetOrdinal("RoomWidth")),
                    RoomHeight = reader.GetDecimal(reader.GetOrdinal("RoomHeight")),

                    WallColor = reader.IsDBNull(reader.GetOrdinal("WallColor"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("WallColor")),

                    FloorColor =reader.IsDBNull(reader.GetOrdinal("FloorColor"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("FloorColor")),

                    Budget = reader.GetDecimal( reader.GetOrdinal("Budget")),

                    TotalCost = reader.GetDecimal(reader.GetOrdinal("TotalCost")),

                    CreatedAt = reader.GetDateTime( reader.GetOrdinal("CreatedAt")),
                    UpdatedAt = reader.GetDateTime(reader.GetOrdinal("UpdatedAt")),
                };
                designs.Add(design);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Tasarımlar alınırken hata oluştu: {ex.Message}");
        }
        return designs;
    }

    public int AddDesign(Design design)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);

            string query = @"
                INSERT INTO Designs
                (
                    DesignName,
                    RoomType,
                    RoomWidth,
                    RoomHeight,
                    WallColor,
                    FloorColor,
                    Budget,
                    TotalCost
                )
                OUTPUT INSERTED.Id
                VALUES
                (
                    @DesignName,@RoomType,@RoomWidth, @RoomHeight, @WallColor, @FloorColor, @Budget, @TotalCost
                )
            ";

            using SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@DesignName", design.DesignName);
            command.Parameters.AddWithValue("@RoomType", design.RoomType);
            command.Parameters.AddWithValue("@RoomWidth", design.RoomWidth);
            command.Parameters.AddWithValue("@RoomHeight", design.RoomHeight);

            command.Parameters.AddWithValue("@WallColor",(object?)design.WallColor ?? DBNull.Value);
            command.Parameters.AddWithValue("@FloorColor", (object?)design.FloorColor ?? DBNull.Value);

            command.Parameters.AddWithValue("@Budget", design.Budget);
            command.Parameters.AddWithValue("@TotalCost", design.TotalCost);

            connection.Open();

            object? result = command.ExecuteScalar();

            if (result == null)
            {
                return 0;
            }

            return Convert.ToInt32(result);
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Tasarım eklenirken hata oluştu: {ex.Message}");
            return 0;
        }
    }

    public Design? GetDesignById(int id)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);

            string query = @"
                SELECT
                    Id,
                    DesignName,
                    RoomType,
                    RoomWidth,
                    RoomHeight,
                    WallColor,
                    FloorColor,
                    Budget,
                    TotalCost,
                    CreatedAt,
                    UpdatedAt
                FROM Designs
                WHERE Id = @Id                    
            ";

            using SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Id", id);

            connection.Open();

            using SqlDataReader reader = command.ExecuteReader();

            if(reader.Read())
            {
                Design design = new Design()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    DesignName = reader.GetString(reader.GetOrdinal("DesignName")),
                    RoomType = reader.GetString(reader.GetOrdinal("RoomType")),
               
                    RoomWidth = reader.GetDecimal(reader.GetOrdinal("RoomWidth")),
                    RoomHeight = reader.GetDecimal(reader.GetOrdinal("RoomHeight")),

                    WallColor = reader.IsDBNull(reader.GetOrdinal("WallColor"))
                        ? null
                        : reader.GetString(reader.GetOrdinal("WallColor")),

                    FloorColor =reader.IsDBNull(reader.GetOrdinal("FloorColor"))
                        ? null
                        : reader.GetString(reader.GetOrdinal("FloorColor")),

                    Budget = reader.GetDecimal(reader.GetOrdinal("Budget")),
                    TotalCost = reader.GetDecimal(reader.GetOrdinal("TotalCost")),

                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                    UpdatedAt = reader.GetDateTime(reader.GetOrdinal("UpdatedAt")),
                };
                return design;
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Tasarım getirilirken hata oluştu: {ex.Message}");
        }
        return null;
    }

    public bool UpdateDesign(int id, Design design)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);
            string query = @"
                UPDATE Designs
                SET
                    DesignName = @DesignName,
                    RoomType = @RoomType, 
                    RoomWidth = @RoomWidth,
                    RoomHeight = @RoomHeight,
                    WallColor = @WallColor,
                    FloorColor = @FloorColor,
                    Budget = @Budget, 
                    TotalCost = @TotalCost,
                    UpdatedAt = SYSDATETIME()
                WHERE Id = @Id
            ";   

            using SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@DesignName", design.DesignName);
            command.Parameters.AddWithValue("@RoomType", design.RoomType);
            command.Parameters.AddWithValue("@RoomWidth", design.RoomWidth);
            command.Parameters.AddWithValue("@RoomHeight", design.RoomHeight);

            command.Parameters.AddWithValue(
                "@WallColor",
                (object?)design.WallColor ?? DBNull.Value
            );
            command.Parameters.AddWithValue(
                "@FloorColor", 
                (object?)design.FloorColor ?? DBNull.Value
            );

            command.Parameters.AddWithValue("@Budget", design.Budget);
            command.Parameters.AddWithValue("@TotalCost", design.TotalCost);
            
            connection.Open();
            int affectedRows = command.ExecuteNonQuery();
            return affectedRows > 0;
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Tasarım güncellenirken hata oluştu: {ex.Message}");
            return false;
        }
    }

    public bool DeleteDesign(int id)
    {
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);

            string query = @"DELETE FROM Designs WHERE Id = @Id";

            using SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@Id", id);

            connection.Open();

            int affectedRows = command.ExecuteNonQuery();
            return affectedRows > 0;   
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Tasarım silinirken hata oluştu: {ex.Message}");
            return false;
        }
    }

    public int SaveDesignWithFurniture(
        int? designId,
        Design design,
        List<FurnitureItem> furnitureItems
    )
    {
        try
        {
            using SqlConnection connection = new SqlConnection(_connectionString);

            connection.Open();

            using SqlTransaction transaction =connection.BeginTransaction();

            try
            {
                int savedDesignId;
                // Mevcut tasarım
                if (designId.HasValue)
                {
                    string updateQuery = @"
                        UPDATE Designs
                        SET
                            DesignName = @DesignName,
                            RoomType = @RoomType,
                            RoomWidth = @RoomWidth,
                            RoomHeight = @RoomHeight,
                            WallColor = @WallColor,
                            FloorColor = @FloorColor,
                            Budget = @Budget,
                            TotalCost = @TotalCost,
                            UpdatedAt = SYSDATETIME()
                        WHERE Id = @Id
                    ";

                    using SqlCommand updateCommand = new SqlCommand(updateQuery, connection, transaction);

                    updateCommand.Parameters.AddWithValue("@Id", designId.Value);

                    updateCommand.Parameters.AddWithValue("@DesignName", design.DesignName);

                    updateCommand.Parameters.AddWithValue("@RoomType", design.RoomType);

                    updateCommand.Parameters.AddWithValue("@RoomWidth", design.RoomWidth);

                    updateCommand.Parameters.AddWithValue("@RoomHeight", design.RoomHeight);

                    updateCommand.Parameters.AddWithValue(
                        "@WallColor",
                        (object?)design.WallColor ?? DBNull.Value
                    );

                    updateCommand.Parameters.AddWithValue(
                        "@FloorColor",
                        (object?)design.FloorColor ?? DBNull.Value
                    );

                    updateCommand.Parameters.AddWithValue("@Budget", design.Budget);

                    updateCommand.Parameters.AddWithValue("@TotalCost", design.TotalCost);

                    int affectedRows = updateCommand.ExecuteNonQuery();

                    if (affectedRows == 0)
                    {
                        throw new Exception("Güncellenecek tasarım bulunamadı.");
                    }
                    savedDesignId = designId.Value;
                }

                // Yeni tasarım
                else
                {
                    string insertDesignQuery = @"
                        INSERT INTO Designs
                        (
                            DesignName,
                            RoomType,
                            RoomWidth,
                            RoomHeight,
                            WallColor,
                            FloorColor,
                            Budget,
                            TotalCost
                        )
                        OUTPUT INSERTED.Id
                        VALUES
                        (
                            @DesignName,
                            @RoomType,
                            @RoomWidth,
                            @RoomHeight,
                            @WallColor,
                            @FloorColor,
                            @Budget,
                            @TotalCost
                        )
                    ";

                    using SqlCommand insertDesignCommand = new SqlCommand(insertDesignQuery, connection, transaction);

                    insertDesignCommand.Parameters.AddWithValue("@DesignName",design.DesignName);

                    insertDesignCommand.Parameters.AddWithValue("@RoomType",design.RoomType);

                    insertDesignCommand.Parameters.AddWithValue( "@RoomWidth", design.RoomWidth);

                    insertDesignCommand.Parameters.AddWithValue("@RoomHeight", design.RoomHeight);

                    insertDesignCommand.Parameters.AddWithValue(
                        "@WallColor",
                        (object?)design.WallColor ?? DBNull.Value
                    );

                    insertDesignCommand.Parameters.AddWithValue(
                        "@FloorColor",
                        (object?)design.FloorColor ?? DBNull.Value
                    );

                    insertDesignCommand.Parameters.AddWithValue("@Budget", design.Budget);

                    insertDesignCommand.Parameters.AddWithValue("@TotalCost", design.TotalCost);

                    object? result = insertDesignCommand.ExecuteScalar();

                    if (result == null)
                    {
                        throw new Exception("Yeni tasarım ID'si alınamadı.");
                    }

                    savedDesignId = Convert.ToInt32(result);
                }


                // Eski mobilyaları temizle
                string deleteFurnitureQuery = @"
                    DELETE FROM FurnitureItems
                    WHERE DesignId = @DesignId
                ";

                using (
                    SqlCommand deleteFurnitureCommand = new SqlCommand(deleteFurnitureQuery, connection, transaction )
                )
                {
                    deleteFurnitureCommand.Parameters.AddWithValue("@DesignId",savedDesignId);

                    deleteFurnitureCommand.ExecuteNonQuery();
                }

                // Güncel mobilyaları ekle
                foreach (FurnitureItem furniture in furnitureItems)
                {
                    string furnitureQuery = @"
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

                    using SqlCommand furnitureCommand = new SqlCommand(furnitureQuery, connection, transaction );

                    furnitureCommand.Parameters.AddWithValue("@DesignId", savedDesignId );

                    furnitureCommand.Parameters.AddWithValue("@CatalogId",furniture.CatalogId);

                    furnitureCommand.Parameters.AddWithValue("@Name",furniture.Name);

                    furnitureCommand.Parameters.AddWithValue("@Type",furniture.Type );

                    furnitureCommand.Parameters.AddWithValue(
                        "@Category",
                        (object?)furniture.Category ?? DBNull.Value
                    );

                    furnitureCommand.Parameters.AddWithValue("@X", furniture.X);

                    furnitureCommand.Parameters.AddWithValue( "@Y", furniture.Y);

                    furnitureCommand.Parameters.AddWithValue( "@Width",furniture.Width );

                    furnitureCommand.Parameters.AddWithValue("@Height",furniture.Height);

                    furnitureCommand.Parameters.AddWithValue("@Rotation", furniture.Rotation);

                    furnitureCommand.Parameters.AddWithValue( "@Price",furniture.Price);

                    furnitureCommand.Parameters.AddWithValue("@ZIndex", furniture.ZIndex);

                    furnitureCommand.Parameters.AddWithValue("@IsLocked", furniture.IsLocked );

                    furnitureCommand.Parameters.AddWithValue(
                        "@WallSide",
                        (object?)furniture.WallSide ?? DBNull.Value
                    );

                    int affectedRows = furnitureCommand.ExecuteNonQuery();

                    if (affectedRows == 0)
                    {
                        throw new Exception( $"{furniture.Name} kaydedilemedi." );
                    }
                }

                transaction.Commit();
                return savedDesignId;
            }
            catch (Exception ex)
            {
                // bir şey hata verirse
                transaction.Rollback();
                Console.WriteLine( $"Transaction geri alındı: {ex.Message}");
                return 0;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Tasarım kaydetme işlemi başlatılamadı: {ex.Message}" );
            return 0;
        }
    }
}