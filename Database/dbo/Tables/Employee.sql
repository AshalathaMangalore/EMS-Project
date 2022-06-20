CREATE TABLE [dbo].[Employee] (
    [Id]           INT          IDENTITY (1, 1) NOT NULL,
    [CompanyId]    INT          NOT NULL,
    [ProjectId]    INT          NOT NULL,
    [FirstName]    VARCHAR (50) NOT NULL,
    [LastName]     VARCHAR (50) NOT NULL,
    [Gender]       VARCHAR (50) NOT NULL,
    [Email]        VARCHAR (50) NOT NULL,
    [Phone]        VARCHAR (50) NOT NULL,
    [DateCreated]  VARCHAR (50) NOT NULL,
    [DateModified] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Employee_CompanyDetail] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[CompanyDetail] ([CompanyId]),
    CONSTRAINT [FK_Employee_ProjectDetail] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[ProjectDetail] ([ProjectId])
);





