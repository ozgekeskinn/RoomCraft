USE RoomCraftDb;
GO

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
VALUES
(
    N'Deneme Salon Tasarımı',
    N'Salon',
    5.00,
    4.00,
    N'#F3F4F6',
    N'#EDE7DD',
    50000,
    27000
);
GO

SELECT * FROM Designs;
GO