CREATE TABLE [dbo].[UserDetail] (
    [UserID]       INT           IDENTITY (1, 1) NOT NULL,
    [UserName]     VARCHAR (50)  NOT NULL,
    [UserPassword] VARCHAR (100) NOT NULL,
    [UserEmail]    VARCHAR (100) NOT NULL,
    CONSTRAINT [PK_UserDetail] PRIMARY KEY CLUSTERED ([UserID] ASC)
);

