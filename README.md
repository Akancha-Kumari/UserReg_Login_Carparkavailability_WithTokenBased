# UserReg_Login_Carparkavailability_WithTokenBased
Application based on AngularJS and .Net API and it has UserRegistration, Login and getting the Carpark availability from api based on token based authentication

Setup
------------
Need to Create DB and Table in Microsoft Sql Server Management Studio 18


CREATE DATABASE UserDB
GO


USE [UserDB]
GO

/****** Object:  Table [dbo].[tblNewUser]    Script Date: 29/5/2021 6:52:12 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblNewUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[Contact_Number] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblNewUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Note: 
1) Please replace your database connection in the project by adding ADO.NET Entity Data Model
2) Click build to manage/load all missing nuget packages
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

