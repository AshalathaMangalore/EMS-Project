CREATE TABLE [dbo].[ProjectDetail] (
    [ProjectId]   INT           IDENTITY (1, 1) NOT NULL,
    [ProjectName] VARCHAR (100) NOT NULL,
    [ProjectDesc] VARCHAR (500) NOT NULL,
    CONSTRAINT [PK_ProjectDetail] PRIMARY KEY CLUSTERED ([ProjectId] ASC)
);

