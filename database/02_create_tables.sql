USE RoomCraftDb;
GO

CREATE TABLE Designs
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DesignName NVARCHAR(100) NOT NULL,
    RoomType NVARCHAR(50) NOT NULL,

    RoomWidth DECIMAL(5,2) NOT NULL,
    RoomHeight DECIMAL(5,2) NOT NULL,

    WallColor NVARCHAR(20),
    FloorColor NVARCHAR(20),

    Budget DECIMAL(18,2) NOT NULL DEFAULT 0,
    TotalCost DECIMAL(18,2) NOT NULL,

    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE FurnitureItems
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DesignId INT NOT NULL,

    CatalogId NVARCHAR(100) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Type NVARCHAR(50) NOT NULL,
    Category NVARCHAR(50),

    X DECIMAL(10,2) NOT NULL,
    Y DECIMAL(10,2) NOT NULL,

    Width DECIMAL(10,2) NOT NULL,
    Height DECIMAL(10,2) NOT NULL,
    Rotation INT NOT NULL DEFAULT 0,
    Price DECIMAL(18,2) NOT NULL DEFAULT 0,
    ZIndex INT NOT NULL DEFAULT 1,
    IsLocked BIT NOT NULL DEFAULT 0,
    WallSide NVARCHAR(20),

    CONSTRAINT FK_FurnitureItems_Designs
        FOREIGN KEY (DesignId)
        REFERENCES Designs(Id)
        ON DELETE CASCADE   -- o tasarımın FurnitureItems kayıtları da otomatik silinsin
);
GO