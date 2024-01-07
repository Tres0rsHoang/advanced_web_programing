/*
 Navicat Premium Data Transfer

 Source Server         : HomeServer Connection
 Source Server Type    : SQL Server
 Source Server Version : 16001105 (16.00.1105)
 Source Host           : www.bao-home-server.site:1433
 Source Catalog        : advantage_web_subject
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 16001105 (16.00.1105)
 File Encoding         : 65001

 Date: 07/01/2024 03:46:29
*/


-- ----------------------------
-- Table structure for classroom
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[classroom]') AND type IN ('U'))
	DROP TABLE [dbo].[classroom]
GO

CREATE TABLE [dbo].[classroom] (
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [name] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [section] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [class_code] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [subject] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [room] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[classroom] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of classroom
-- ----------------------------
BEGIN TRANSACTION
GO

INSERT INTO [dbo].[classroom] ([id], [name], [section], [class_code], [subject], [room]) VALUES (N'387f23cb-1269-4066-9a3e-aff2604cff92', N'undefined', N'undefined', N'amRlftJ', N'undefined', N'undefined')
GO

INSERT INTO [dbo].[classroom] ([id], [name], [section], [class_code], [subject], [room]) VALUES (N'8abdd24e-2d2e-4e2f-932d-5af086c78a00', N'undefined', N'undefined', N'f8Jn4Nb', N'undefined', N'undefined')
GO

INSERT INTO [dbo].[classroom] ([id], [name], [section], [class_code], [subject], [room]) VALUES (N'bd4badf8-9500-4cca-b030-cd252788189a', N'Hello World', N'subjectTitle', N'SoJgusB', N'Programing', N'I03A')
GO

COMMIT
GO


-- ----------------------------
-- Table structure for classroom_grade
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[classroom_grade]') AND type IN ('U'))
	DROP TABLE [dbo].[classroom_grade]
GO

CREATE TABLE [dbo].[classroom_grade] (
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [grade_scale] int  NULL,
  [name] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [classroom_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[classroom_grade] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of classroom_grade
-- ----------------------------
BEGIN TRANSACTION
GO

INSERT INTO [dbo].[classroom_grade] ([id], [grade_scale], [name], [classroom_id]) VALUES (N'7ecf9201-efcf-4949-a2d6-6ac1bbd35af1', N'100', N'Test', N'bd4badf8-9500-4cca-b030-cd252788189a')
GO

INSERT INTO [dbo].[classroom_grade] ([id], [grade_scale], [name], [classroom_id]) VALUES (N'91052ec6-e6a1-48d2-a90f-26461dd38e09', N'200', N'Hello World', N'bd4badf8-9500-4cca-b030-cd252788189a')
GO

COMMIT
GO


-- ----------------------------
-- Table structure for classroom_student
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[classroom_student]') AND type IN ('U'))
	DROP TABLE [dbo].[classroom_student]
GO

CREATE TABLE [dbo].[classroom_student] (
  [student_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [classroom_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [is_removed] bit  NULL,
  [in_class_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[classroom_student] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of classroom_student
-- ----------------------------
BEGIN TRANSACTION
GO

INSERT INTO [dbo].[classroom_student] ([student_id], [classroom_id], [is_removed], [in_class_id]) VALUES (N'0847f5e4-6325-4945-88a3-dc00383a92e9', N'bd4badf8-9500-4cca-b030-cd252788189a', N'0', N'IMfm')
GO

COMMIT
GO


-- ----------------------------
-- Table structure for classroom_teacher
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[classroom_teacher]') AND type IN ('U'))
	DROP TABLE [dbo].[classroom_teacher]
GO

CREATE TABLE [dbo].[classroom_teacher] (
  [teacher_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [classroom_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [is_deleted] bit DEFAULT 0 NOT NULL
)
GO

ALTER TABLE [dbo].[classroom_teacher] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of classroom_teacher
-- ----------------------------
BEGIN TRANSACTION
GO

INSERT INTO [dbo].[classroom_teacher] ([teacher_id], [classroom_id], [is_deleted]) VALUES (N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'bd4badf8-9500-4cca-b030-cd252788189a', N'0')
GO

INSERT INTO [dbo].[classroom_teacher] ([teacher_id], [classroom_id], [is_deleted]) VALUES (N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'387f23cb-1269-4066-9a3e-aff2604cff92', N'0')
GO

INSERT INTO [dbo].[classroom_teacher] ([teacher_id], [classroom_id], [is_deleted]) VALUES (N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'bd4badf8-9500-4cca-b030-cd252788189a', N'0')
GO

COMMIT
GO


-- ----------------------------
-- Table structure for refresh_authen
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[refresh_authen]') AND type IN ('U'))
	DROP TABLE [dbo].[refresh_authen]
GO

CREATE TABLE [dbo].[refresh_authen] (
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [user_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [token] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [is_revoked] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[refresh_authen] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of refresh_authen
-- ----------------------------
BEGIN TRANSACTION
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'0148b026-542d-4ad4-9cd8-5c1bac93da87', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxNDhiMDI2LTU0MmQtNGFkNC05Y2Q4LTVjMWJhYzkzZGE4NyIsImlhdCI6MTcwMzg3OTgwOSwiZXhwIjoxNzA0NDg0NjA5fQ.GkpwUWLJnmR6lb1zSwzIUno6qMXSwHQoJ5kFC_M1iwM', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'01fffeb9-12a7-4257-864a-eb8cf859e1d5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxZmZmZWI5LTEyYTctNDI1Ny04NjRhLWViOGNmODU5ZTFkNSIsImlhdCI6MTcwNDQ3MDI5MSwiZXhwIjoxNzA1MDc1MDkxfQ.mgIsBEKsFbYj2HztJSfWxc6OdBia3gWTBu6aA1PmIVk', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'0aaf2a06-f0fc-447c-866d-6645618eb50d', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBhYWYyYTA2LWYwZmMtNDQ3Yy04NjZkLTY2NDU2MThlYjUwZCIsImlhdCI6MTcwNDQ3NjQ5OSwiZXhwIjoxNzA1MDgxMjk5fQ.pTIqJ8eWwCJZeszaKxylx9FqmLr2n2GXY0xmYsbITQs', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'0ca0b4b9-f776-4707-975b-533208890968', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYTBiNGI5LWY3NzYtNDcwNy05NzViLTUzMzIwODg5MDk2OCIsImlhdCI6MTcwNDU2MzExNSwiZXhwIjoxNzA1MTY3OTE1fQ.FUkru6iYZNfogtmNqyjq6sr4eUYI5UcLGV8YhzonjQc', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'0f1fab62-13cd-4ece-8954-f58456a0ea2a', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMWZhYjYyLTEzY2QtNGVjZS04OTU0LWY1ODQ1NmEwZWEyYSIsImlhdCI6MTcwMzY4NzUwNywiZXhwIjoxNzA0MjkyMzA3fQ.DM1ZZeLCifO9JMiCT6y2mj_59Ku8FUT8IvnM93_bJ6g', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'13090bea-1c80-4186-ae30-42a4da1c578b', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMDkwYmVhLTFjODAtNDE4Ni1hZTMwLTQyYTRkYTFjNTc4YiIsImlhdCI6MTcwNDQ2NjI5MywiZXhwIjoxNzA1MDcxMDkzfQ.WlHZvjI7WiXl_VhHy_nUos4_1iLflRTOB0ZnLlNkDcI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'14c41676-7f28-4f04-b296-7df98b857e63', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0YzQxNjc2LTdmMjgtNGYwNC1iMjk2LTdkZjk4Yjg1N2U2MyIsImlhdCI6MTcwNDQ2NzU4MCwiZXhwIjoxNzA1MDcyMzgwfQ.1jRYPrg2P38viKgNx7oT2Bj5gsQmL2wvoBDohZQE8UQ', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'19db659f-f0f2-481b-a520-7346f990f8f5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZGI2NTlmLWYwZjItNDgxYi1hNTIwLTczNDZmOTkwZjhmNSIsImlhdCI6MTcwNDQ4MDI4MywiZXhwIjoxNzA1MDg1MDgzfQ.JyQzj9RHwfprVvFDXO_BDfNUQifmu79jTSg2klGbQzw', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'1b091cc9-7ab2-4456-a75f-3747543766ca', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiMDkxY2M5LTdhYjItNDQ1Ni1hNzVmLTM3NDc1NDM3NjZjYSIsImlhdCI6MTcwMzYwODI3MiwiZXhwIjoxNzA0MjEzMDcyfQ.YblgUbH_uVTMpERUqujH3Z2mJy7Xef3w_r8ToENOJfA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'1c334938-132f-488b-b064-0c22e08ef053', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzM0OTM4LTEzMmYtNDg4Yi1iMDY0LTBjMjJlMDhlZjA1MyIsImlhdCI6MTcwMzg3NjExNywiZXhwIjoxNzA0NDgwOTE3fQ.CNwwmne9f_L-w65BEZaSDoyCm5e4TiIr-5NlH1eKzYQ', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'20a4ac61-c54e-4c8a-8126-3daa080da333', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwYTRhYzYxLWM1NGUtNGM4YS04MTI2LTNkYWEwODBkYTMzMyIsImlhdCI6MTcwNDQ3NzY4NywiZXhwIjoxNzA1MDgyNDg3fQ.fF_9KOREQt32jFAOqej50GaPVgjLiOFhgxS1foPcU1A', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'230ea86c-11aa-4acb-9029-b8d0d3b27b2e', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMGVhODZjLTExYWEtNGFjYi05MDI5LWI4ZDBkM2IyN2IyZSIsImlhdCI6MTcwNDQ3MTg5MywiZXhwIjoxNzA1MDc2NjkzfQ.dAfQGX2F2QV6U4SvzhgI2t9Xq9xgsctpouWCb_MPF08', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'23bac7c2-7f6f-4cb7-98e8-5d73445d023e', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzYmFjN2MyLTdmNmYtNGNiNy05OGU4LTVkNzM0NDVkMDIzZSIsImlhdCI6MTcwMzg2NDA2MCwiZXhwIjoxNzA0NDY4ODYwfQ.Fa-T7wMtBXw_zcPeIclEJLDtOj7cqidjJGCfzlCJpW0', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'26a7cafc-2e11-4d72-bde8-016161e5ceee', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2YTdjYWZjLTJlMTEtNGQ3Mi1iZGU4LTAxNjE2MWU1Y2VlZSIsImlhdCI6MTcwMzY4ODY2MiwiZXhwIjoxNzA0MjkzNDYyfQ.omG-eDmFIRTgqgtVz4eH5tHH1OQMZIDxiQ9r9Bcj7sw', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'26f69086-0d01-4611-b63d-72c9112daa0e', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2ZjY5MDg2LTBkMDEtNDYxMS1iNjNkLTcyYzkxMTJkYWEwZSIsImlhdCI6MTcwMzg4Mzc1MywiZXhwIjoxNzA0NDg4NTUzfQ.sTFui5_HqLL9iUBK4dbZoE1io53auIoLdVBYiphmBt0', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'2855cca2-3f59-449c-a57e-44bb16e44cf1', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4NTVjY2EyLTNmNTktNDQ5Yy1hNTdlLTQ0YmIxNmU0NGNmMSIsImlhdCI6MTcwNDQ3NjgyNSwiZXhwIjoxNzA1MDgxNjI1fQ.HLWBaskuuxuJcBx8hiKJ2V4uLFpZz70gO95eCXBuFcA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'2c993d8b-35db-4a7e-9215-efb7f1ae2f2a', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjOTkzZDhiLTM1ZGItNGE3ZS05MjE1LWVmYjdmMWFlMmYyYSIsImlhdCI6MTcwNDQ3MDE0NywiZXhwIjoxNzA1MDc0OTQ3fQ.YzQUJtdfAFcTMrP1r7VPcrtIPZ-c3jgPZA9ByGUZzEI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'2de99a15-9561-4352-8de9-38e3ea9f7721', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJkZTk5YTE1LTk1NjEtNDM1Mi04ZGU5LTM4ZTNlYTlmNzcyMSIsImlhdCI6MTcwNDQ2NjMyMiwiZXhwIjoxNzA1MDcxMTIyfQ.CXgG3-83Q6JvZzIjExpn3eNJLgQWIo2FftyqlhNKk7w', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'31ea3c46-3f2c-47f5-ae6f-ac3f6f87aa2e', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxZWEzYzQ2LTNmMmMtNDdmNS1hZTZmLWFjM2Y2Zjg3YWEyZSIsImlhdCI6MTcwMzYwODI0MSwiZXhwIjoxNzA0MjEzMDQxfQ.nD8B-4qYpI_v4CM6l3P02yNbA9_EE0j-cEhdg3KpNJU', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'340ac110-9345-4585-972a-efcd36a3b956', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0MGFjMTEwLTkzNDUtNDU4NS05NzJhLWVmY2QzNmEzYjk1NiIsImlhdCI6MTcwNDQ3ODMwNSwiZXhwIjoxNzA1MDgzMTA1fQ.mXoOEmQhZXHP7_CJLV2SGon-kNyPVchHIUW51QUZt78', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'36eca64e-c4c0-432f-b346-cde09c6ffaa4', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2ZWNhNjRlLWM0YzAtNDMyZi1iMzQ2LWNkZTA5YzZmZmFhNCIsImlhdCI6MTcwMzY5NTA4MiwiZXhwIjoxNzA0Mjk5ODgyfQ.iDJa9OXuaglJaNrDt-pp0BafBe2nNgLeS9rV8kjsyJY', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'371d046d-7ffb-4ad2-9d07-3b98cc794fb5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MWQwNDZkLTdmZmItNGFkMi05ZDA3LTNiOThjYzc5NGZiNSIsImlhdCI6MTcwMzY5NzE0NiwiZXhwIjoxNzA0MzAxOTQ2fQ.VETabqOb5qk3Yj_3hV1Xt18NlrsiAumPvcq1YcIPVnY', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'39ce4fda-6f7c-44e7-9c97-72a5a8c42957', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5Y2U0ZmRhLTZmN2MtNDRlNy05Yzk3LTcyYTVhOGM0Mjk1NyIsImlhdCI6MTcwNDQ2NjUyMSwiZXhwIjoxNzA1MDcxMzIxfQ.-tV0cy3_wy9PpyaUepnfOSv6HbgsGMNtPyGG_H_zMQU', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'3a5d6367-df54-45bf-9a4a-703f7810abb2', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhNWQ2MzY3LWRmNTQtNDViZi05YTRhLTcwM2Y3ODEwYWJiMiIsImlhdCI6MTcwNDQ3MDM5NiwiZXhwIjoxNzA1MDc1MTk2fQ.qgMuJfQIo6nmLYIwgJM8obBm2bL9FRIvevydACF0eeA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'424f3be7-1430-4fcb-a9db-38e107380253', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyNGYzYmU3LTE0MzAtNGZjYi1hOWRiLTM4ZTEwNzM4MDI1MyIsImlhdCI6MTcwMzY4OTE3NywiZXhwIjoxNzA0MjkzOTc3fQ.qh7OWKrj1fXwtvbA3cO1NGRBh3z3KV9dNFLdRf4UR6I', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'4464b5dd-34f6-43ba-94ac-a257364fc4b5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NjRiNWRkLTM0ZjYtNDNiYS05NGFjLWEyNTczNjRmYzRiNSIsImlhdCI6MTcwMzg3MjkzOSwiZXhwIjoxNzA0NDc3NzM5fQ.xP_7O_WJfjf-vnyY-lM01UNoBg4IUlWfAblKncfseEg', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'458ce7ac-9f23-4379-8c9e-9457db69e815', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1OGNlN2FjLTlmMjMtNDM3OS04YzllLTk0NTdkYjY5ZTgxNSIsImlhdCI6MTcwMzg2Nzc3MiwiZXhwIjoxNzA0NDcyNTcyfQ.6xkaOmMy3wFOnirvn2M08sBaE5xdL2xpy1kzbbluziY', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'4825b3da-e843-4dd4-8c54-d6c41dee9af3', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MjViM2RhLWU4NDMtNGRkNC04YzU0LWQ2YzQxZGVlOWFmMyIsImlhdCI6MTcwMzg3OTEyMywiZXhwIjoxNzA0NDgzOTIzfQ.jlz5SKywDDH8ybGANuM9KM5YZSqpfqcuPTzjvZiGhh8', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'49be1843-f214-4f36-be69-6aae5c41f9a4', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5YmUxODQzLWYyMTQtNGYzNi1iZTY5LTZhYWU1YzQxZjlhNCIsImlhdCI6MTcwNDQ2OTYwOCwiZXhwIjoxNzA1MDc0NDA4fQ.aj9Ihb_qEKYwrzz6Mc45aQ7Q1relA_mqrFxOeI3Cgrk', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'4a97d79e-cae4-4182-b288-8bc47ced3cfa', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhOTdkNzllLWNhZTQtNDE4Mi1iMjg4LThiYzQ3Y2VkM2NmYSIsImlhdCI6MTcwMzg3NTc4MiwiZXhwIjoxNzA0NDgwNTgyfQ.waCnvWxapZZ648qffLAiKdBdx7EVwG-GDTevHmXa06o', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'4ab58ac6-7672-45fb-8390-09dcfe3cbd27', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhYjU4YWM2LTc2NzItNDVmYi04MzkwLTA5ZGNmZTNjYmQyNyIsImlhdCI6MTcwMzg3MDQ3NSwiZXhwIjoxNzA0NDc1Mjc1fQ.ghO6hKlQdyqeCnsXdusIARTcazf8VRXqZzVdv0TVkqA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'567d0914-4625-4331-a0ba-c5cbbc1ec49e', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2N2QwOTE0LTQ2MjUtNDMzMS1hMGJhLWM1Y2JiYzFlYzQ5ZSIsImlhdCI6MTcwNDQ3NDM1MCwiZXhwIjoxNzA1MDc5MTUwfQ.VhBu6qvLDcQUDO2k7ICl8trZauEq60fZmbRMjpbdWgM', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'5bee4e2e-fcf3-448b-b5b9-7ed18d582615', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZWU0ZTJlLWZjZjMtNDQ4Yi1iNWI5LTdlZDE4ZDU4MjYxNSIsImlhdCI6MTcwNDQ2OTU5NCwiZXhwIjoxNzA1MDc0Mzk0fQ.U3vffT48mRx5ONGCX_0mGrLunxO4OwSvtL7sqQG043k', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'60648597-4046-48b4-9e63-6260018b5c27', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjQ4NTk3LTQwNDYtNDhiNC05ZTYzLTYyNjAwMThiNWMyNyIsImlhdCI6MTcwMzg2ODczMywiZXhwIjoxNzA0NDczNTMzfQ.8mBwBPIqaN5ZAtrSRLBMN4kOXCKGrsenzsoe1sTUwhQ', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'63bc2aee-fbcf-4f31-a68e-336d652d57ed', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmMyYWVlLWZiY2YtNGYzMS1hNjhlLTMzNmQ2NTJkNTdlZCIsImlhdCI6MTcwMzg3NzkxOCwiZXhwIjoxNzA0NDgyNzE4fQ.1nzHjRgyckoNKzFPsBMD62bdJ1i1Q_W28quJ_b2kG8o', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'658e84f1-1aa9-4294-80ac-317234783d68', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGU4NGYxLTFhYTktNDI5NC04MGFjLTMxNzIzNDc4M2Q2OCIsImlhdCI6MTcwNDQ3MDc4MSwiZXhwIjoxNzA1MDc1NTgxfQ.ZAE3-M2qWRDO0WzQNoOCR6q2sfBufdl9PXFAkCK5tls', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'66ba1ff0-5c68-4e38-82eb-d1a897ac4dc1', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmExZmYwLTVjNjgtNGUzOC04MmViLWQxYTg5N2FjNGRjMSIsImlhdCI6MTcwMzg4MzMyMSwiZXhwIjoxNzA0NDg4MTIxfQ.7F4U6rHIxoURqvHSqx008W3Evo6hHTwrChkT6FTe_e4', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'6a3ddf9d-89ef-441c-950e-0f522b7ded23', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhM2RkZjlkLTg5ZWYtNDQxYy05NTBlLTBmNTIyYjdkZWQyMyIsImlhdCI6MTcwMzg2MjE2MSwiZXhwIjoxNzA0NDY2OTYxfQ.qTRslFLK9UeLCRaNd8PnYIr3PHKbhM3XgeSR28eJJFc', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'70e2e966-27f3-42bf-935b-0654c340941f', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwZTJlOTY2LTI3ZjMtNDJiZi05MzViLTA2NTRjMzQwOTQxZiIsImlhdCI6MTcwMzg3MjU1NCwiZXhwIjoxNzA0NDc3MzU0fQ.hWJSiI-5jfQpKXz9wL6XfTERzNV2wFN0UiPWVhPaoDw', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'7272a2d7-90c6-4bb2-bae9-196513c821f0', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNzJhMmQ3LTkwYzYtNGJiMi1iYWU5LTE5NjUxM2M4MjFmMCIsImlhdCI6MTcwMzg3MzM0OCwiZXhwIjoxNzA0NDc4MTQ4fQ.wF4G72qs_hfbRHjR1zyxk5Z5bT2FFCrY4wXz7znzEbI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'77ecf29c-32e6-4d99-a911-e73dac4b9b02', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3ZWNmMjljLTMyZTYtNGQ5OS1hOTExLWU3M2RhYzRiOWIwMiIsImlhdCI6MTcwMzg3NjQ1MiwiZXhwIjoxNzA0NDgxMjUyfQ.OPbTrNBi6ROLA0TjDt13cSBvI3KPrusvlowZ4FyRTIM', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'78557c9f-2629-471f-a02c-6667374bd162', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NTU3YzlmLTI2MjktNDcxZi1hMDJjLTY2NjczNzRiZDE2MiIsImlhdCI6MTcwMzg2NzQ5NSwiZXhwIjoxNzA0NDcyMjk1fQ.uxunxLLmpLxtt8dRT8TCEaTW9J54uMfkvs25NYAJ5LY', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'7982c6df-b33e-46ad-a17c-19ade7710ec8', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5ODJjNmRmLWIzM2UtNDZhZC1hMTdjLTE5YWRlNzcxMGVjOCIsImlhdCI6MTcwNDQ2OTcwNCwiZXhwIjoxNzA1MDc0NTA0fQ.uH5n4VM8IsSkiG0YkgWLdqDumf0AsVd3kU7bQ1k4__Y', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'79afff08-a8e6-45ad-ba39-1ad69e3a2e02', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YWZmZjA4LWE4ZTYtNDVhZC1iYTM5LTFhZDY5ZTNhMmUwMiIsImlhdCI6MTcwMzYwNzc4MywiZXhwIjoxNzA0MjEyNTgzfQ.Q2X0iFeZBfsEdC3ETGwFfnWe3SYSMcQKYx3Fbcx5Bso', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'7aaf247c-e784-43dc-bf14-a188ea10fb60', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhYWYyNDdjLWU3ODQtNDNkYy1iZjE0LWExODhlYTEwZmI2MCIsImlhdCI6MTcwNDQ2NTg0NSwiZXhwIjoxNzA1MDcwNjQ1fQ.6qTY9GEP3xKEIEBA1jOKZq4tKsDD1AX-TMv4332D5Bo', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'7aec0874-4aff-4edc-8cac-bbc768ab0636', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhZWMwODc0LTRhZmYtNGVkYy04Y2FjLWJiYzc2OGFiMDYzNiIsImlhdCI6MTcwMzg3NTE3NSwiZXhwIjoxNzA0NDc5OTc1fQ.WdCps5b0kuUUBstCcmDB4-y3LsK5brTIhCqOXhOstXM', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'870dac64-570b-4dfa-9f95-b585dde0e8be', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MGRhYzY0LTU3MGItNGRmYS05Zjk1LWI1ODVkZGUwZThiZSIsImlhdCI6MTcwMzg4MjQzNCwiZXhwIjoxNzA0NDg3MjM0fQ.AS3Xn3fHOACf7nHCiNDSk6x7aBNXOiyoOgweNoKIffs', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'8861d1de-a8fd-44c7-bb50-29a9e269c6f5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NjFkMWRlLWE4ZmQtNDRjNy1iYjUwLTI5YTllMjY5YzZmNSIsImlhdCI6MTcwNDU2MzY2NSwiZXhwIjoxNzA1MTY4NDY1fQ.riFeBKhWejwKCvLFZgDCIRCdOZnvpo-nLTTHrdVxlw8', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'8a3d9b72-b6fd-46da-8339-6ae3229a56c5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhM2Q5YjcyLWI2ZmQtNDZkYS04MzM5LTZhZTMyMjlhNTZjNSIsImlhdCI6MTcwMzY5ODU0OSwiZXhwIjoxNzA0MzAzMzQ5fQ.e43NobKw9h881qOil2oWq7pbpGs6Af34pgMYWtLd11o', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'8be42310-f214-4968-b287-ed253a2cf7d7', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiZTQyMzEwLWYyMTQtNDk2OC1iMjg3LWVkMjUzYTJjZjdkNyIsImlhdCI6MTcwNDQ3NTIzMSwiZXhwIjoxNzA1MDgwMDMxfQ.sTvIPBRhC5kWJD0ViZVhUehkqaOEmNL13A5V72HWHIA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'8da770fb-40bc-4c94-9898-91ad487169c3', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkYTc3MGZiLTQwYmMtNGM5NC05ODk4LTkxYWQ0ODcxNjljMyIsImlhdCI6MTcwNDQ3NDcxNSwiZXhwIjoxNzA1MDc5NTE1fQ.mV9Gnmo29s0kUA6VANnC7OflsWCDmZ7hOWL43dQtDPQ', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'90e3056f-af1f-4b67-b40d-000d0f983234', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwZTMwNTZmLWFmMWYtNGI2Ny1iNDBkLTAwMGQwZjk4MzIzNCIsImlhdCI6MTcwNDQ2OTQ1MywiZXhwIjoxNzA1MDc0MjUzfQ.luyl-k14ItC7VlpTcegiFFL8LHy0EauQx5_8-eW9hFo', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'93854311-5a30-4055-b8d5-a9c824ae9ef2', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzODU0MzExLTVhMzAtNDA1NS1iOGQ1LWE5YzgyNGFlOWVmMiIsImlhdCI6MTcwMzg2Mzg2MSwiZXhwIjoxNzA0NDY4NjYxfQ.urUBmTIwBhJ6RVV4FvQY5WcMyQsMIBgmd2a9SpqsSrg', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'94f36e4c-4d38-4988-831d-9bacc4a1cf33', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0ZjM2ZTRjLTRkMzgtNDk4OC04MzFkLTliYWNjNGExY2YzMyIsImlhdCI6MTcwMzY5NjgyNCwiZXhwIjoxNzA0MzAxNjI0fQ.we7w1ERLyATEdxTKhPDfQ3wFIaVjEac6dQ7zLhAmeB4', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'969a1fbe-093e-411d-b8a7-be98e7e27812', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk2OWExZmJlLTA5M2UtNDExZC1iOGE3LWJlOThlN2UyNzgxMiIsImlhdCI6MTcwNDQ2OTQyMywiZXhwIjoxNzA1MDc0MjIzfQ.ZRVUYGpgrZ9uFLuJjlHq41jMANyaCvG2F8-4LXQAeDs', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'9faeba0e-8378-42f4-ba18-e8af5b783e21', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlmYWViYTBlLTgzNzgtNDJmNC1iYTE4LWU4YWY1Yjc4M2UyMSIsImlhdCI6MTcwNDQ3NzUzMiwiZXhwIjoxNzA1MDgyMzMyfQ.edKauNG9Zanuh9Hd4yPYZh28zKRAZuPOmQbb_H-4D8E', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a028b9e1-6bf9-4629-94b8-9ba9c5c744c2', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwMjhiOWUxLTZiZjktNDYyOS05NGI4LTliYTljNWM3NDRjMiIsImlhdCI6MTcwNDQ3NjI5MCwiZXhwIjoxNzA1MDgxMDkwfQ.XKrz-nPUdGYlrUd5R96o8Fk3qomxunFFl_WYjeguGVI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a0ff0c40-da61-4f80-9aaf-7b4832dd5127', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwZmYwYzQwLWRhNjEtNGY4MC05YWFmLTdiNDgzMmRkNTEyNyIsImlhdCI6MTcwMzg2MTQ5NSwiZXhwIjoxNzA0NDY2Mjk1fQ.fOV3wKvw6BJmFn3VJjpepIa_QrDSUiLDkqb0lcjHahE', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a1dde159-ed2b-4ca5-9de6-2294013f6a94', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExZGRlMTU5LWVkMmItNGNhNS05ZGU2LTIyOTQwMTNmNmE5NCIsImlhdCI6MTcwMzg3NzYwNiwiZXhwIjoxNzA0NDgyNDA2fQ.ddTgAKoz_Nrnpt3w4G3dbeBPP8meDf9FJeTY0lpx5Jc', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a2566d32-611f-4c64-9b0e-5f681f4c4843', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyNTY2ZDMyLTYxMWYtNGM2NC05YjBlLTVmNjgxZjRjNDg0MyIsImlhdCI6MTcwMzg3Mzk5OSwiZXhwIjoxNzA0NDc4Nzk5fQ.Z7maBsNW_eYoHXbrlq_MEKERzNG0lnaNLaHw6W8Gg5w', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a2edac03-46be-4e30-9d8f-e9d16f3519a3', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyZWRhYzAzLTQ2YmUtNGUzMC05ZDhmLWU5ZDE2ZjM1MTlhMyIsImlhdCI6MTcwNDQ2NzQzNSwiZXhwIjoxNzA1MDcyMjM1fQ.Ik1LhD6tsP5C_7upd_OMw4aqt4g70oqorPtNcMCk5fw', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a535c5d4-31ac-4cf0-9c22-95fecacb4cbf', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1MzVjNWQ0LTMxYWMtNGNmMC05YzIyLTk1ZmVjYWNiNGNiZiIsImlhdCI6MTcwNDQ2OTUwNCwiZXhwIjoxNzA1MDc0MzA0fQ.RtxEWy2nEx6R2GGjjwfRHbZKUsgVJXCOzNUm00p6PMc', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a5838910-b8ae-4895-96b9-a860428415f5', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1ODM4OTEwLWI4YWUtNDg5NS05NmI5LWE4NjA0Mjg0MTVmNSIsImlhdCI6MTcwMzYwNzc3OCwiZXhwIjoxNzA0MjEyNTc4fQ.oF7QL6h3NEPEjd8ZHoiYmDTcQsoJ9ZzCwDfkPaR-nn0', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a62daa99-8140-41c7-8e4d-0e40556afccd', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2MmRhYTk5LTgxNDAtNDFjNy04ZTRkLTBlNDA1NTZhZmNjZCIsImlhdCI6MTcwNDQ2NzYxOSwiZXhwIjoxNzA1MDcyNDE5fQ.gvaPRNwl3TsejEj91b3iR0GUP3-NRPG9eNJN3ksbr5E', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a7c2e0e1-4b5a-4fb5-884f-e025c8a20e61', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3YzJlMGUxLTRiNWEtNGZiNS04ODRmLWUwMjVjOGEyMGU2MSIsImlhdCI6MTcwMzY5NDY3NSwiZXhwIjoxNzA0Mjk5NDc1fQ.vvjgaC_NnYVvTyNFrhMIAGu7BDF8Nl0p7l2lu02zmkI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a7f5ec62-da8c-4d47-a818-47a7b3030e05', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3ZjVlYzYyLWRhOGMtNGQ0Ny1hODE4LTQ3YTdiMzAzMGUwNSIsImlhdCI6MTcwMzg4MDExNCwiZXhwIjoxNzA0NDg0OTE0fQ.rWpQanHqHxfLKAZW3toSq4w65IyJdlhIg36Nnpp9d_E', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'a918b9b1-cb2e-4787-9fca-9bac68a81bab', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE5MThiOWIxLWNiMmUtNDc4Ny05ZmNhLTliYWM2OGE4MWJhYiIsImlhdCI6MTcwMzYwMzA4MiwiZXhwIjoxNzA0MjA3ODgyfQ.gO7S_MmOB0QyA6rygwjMOU12OM_OAQ-GEqJ3SEaDJVk', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'aaa5145a-f5c9-4297-afe9-76267efdfe83', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhYTUxNDVhLWY1YzktNDI5Ny1hZmU5LTc2MjY3ZWZkZmU4MyIsImlhdCI6MTcwNDQ2OTY0OCwiZXhwIjoxNzA1MDc0NDQ4fQ.g-V5jtRyI8xVY0Y6GXloFJfdsw2XQx1uHB5QyJTiuiA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'ad420284-4088-439a-8c58-1b0cbcce84e8', N'0847f5e4-6325-4945-88a3-dc00383a92e9', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkNDIwMjg0LTQwODgtNDM5YS04YzU4LTFiMGNiY2NlODRlOCIsImlhdCI6MTcwNDQ3MjU3MiwiZXhwIjoxNzA1MDc3MzcyfQ.Pq9EtUGcasH1s4gjK-kYFjCScYkwnVda0Y7KxQrXsFQ', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'b0f18e42-6eca-49bb-be4e-0ce6e044488b', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZjE4ZTQyLTZlY2EtNDliYi1iZTRlLTBjZTZlMDQ0NDg4YiIsImlhdCI6MTcwNDQ2OTg4NCwiZXhwIjoxNzA1MDc0Njg0fQ.bjayZzSH1kLWp4SG8Ng-bxVbXzHD5i0V_27yll-WffU', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'b226b8f0-3ee4-4a92-a53b-5ca8d43e2d87', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMjZiOGYwLTNlZTQtNGE5Mi1hNTNiLTVjYThkNDNlMmQ4NyIsImlhdCI6MTcwNDQ3MDEzNSwiZXhwIjoxNzA1MDc0OTM1fQ.O_LHVATfMPJfSjcWiVb6OwrMTE6wT4aoEu29HSYov18', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'b434d6c9-7639-4239-8b5d-f09397de75b2', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0MzRkNmM5LTc2MzktNDIzOS04YjVkLWYwOTM5N2RlNzViMiIsImlhdCI6MTcwMzYwNTA3OSwiZXhwIjoxNzA0MjA5ODc5fQ.lHHZC3QUtyZDSiTUpD_ePaGQ__XJjnYof_bqiJpo37c', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'b47bc8bc-6866-4f9f-a970-366b76119744', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0N2JjOGJjLTY4NjYtNGY5Zi1hOTcwLTM2NmI3NjExOTc0NCIsImlhdCI6MTcwMzg3NTc2NywiZXhwIjoxNzA0NDgwNTY3fQ.Q0yxdWvo0VsyAS4q6aLrol4N_Shr5-uA3CWTNif-jQc', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'b6fec793-a4ab-4875-99e7-7e0d5c7aa3d2', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZmVjNzkzLWE0YWItNDg3NS05OWU3LTdlMGQ1YzdhYTNkMiIsImlhdCI6MTcwMzYwODYxNiwiZXhwIjoxNzA0MjEzNDE2fQ.MzIlhW46o7AuRLLSV0MwmOAtdra8jiY2pwBHeLlOMw8', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'baad6086-5b32-4328-9159-3808801540fe', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhYWQ2MDg2LTViMzItNDMyOC05MTU5LTM4MDg4MDE1NDBmZSIsImlhdCI6MTcwMzg4MTE5NCwiZXhwIjoxNzA0NDg1OTk0fQ.xmUaSfcqU8MdrcDYPA3CqvI7o0LXh33tN4le23MVYhM', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'be1af93b-5731-420a-bf93-5882a537e1ed', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJlMWFmOTNiLTU3MzEtNDIwYS1iZjkzLTU4ODJhNTM3ZTFlZCIsImlhdCI6MTcwNDQ2OTU2OCwiZXhwIjoxNzA1MDc0MzY4fQ.k2fq7Om9vaFovFwMtg2HzSklJVPTLu0PHJTbqpy5-r0', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'c0eb6992-68e0-4e1a-85a0-50215f9ca476', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwZWI2OTkyLTY4ZTAtNGUxYS04NWEwLTUwMjE1ZjljYTQ3NiIsImlhdCI6MTcwMzg4Mzk5MiwiZXhwIjoxNzA0NDg4NzkyfQ.OcskgGP20bNEUjb2UD8tWhGLx3xVAxPAGlJkwOI7RwU', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'c3f22c11-f645-4851-981c-c48ebf34eccf', N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzZjIyYzExLWY2NDUtNDg1MS05ODFjLWM0OGViZjM0ZWNjZiIsImlhdCI6MTcwNDQ3MTkwOSwiZXhwIjoxNzA1MDc2NzA5fQ.asXIL2TT20W-RjvD4rZY8Rd6E6bvi4RAR38YkeRa6LI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'c7acaa4d-718b-4b5e-afd4-10f8ee831e71', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3YWNhYTRkLTcxOGItNGI1ZS1hZmQ0LTEwZjhlZTgzMWU3MSIsImlhdCI6MTcwMzYwNzIyMSwiZXhwIjoxNzA0MjEyMDIxfQ.b-FfwUJ0kqVprwDAyqybQANIPn-v-KniDtpsuOVOhYU', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'ca00f92c-cfdc-40d1-a95a-1e409c5b9c35', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMDBmOTJjLWNmZGMtNDBkMS1hOTVhLTFlNDA5YzViOWMzNSIsImlhdCI6MTcwMzY5NTQyNSwiZXhwIjoxNzA0MzAwMjI1fQ.Nd41J4B-RLWS4yAiRgXaJb-0JXGbStabO8cpCW0g-V8', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'cb977966-930e-4447-b0ca-8ba1983aee0a', N'0847f5e4-6325-4945-88a3-dc00383a92e9', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiOTc3OTY2LTkzMGUtNDQ0Ny1iMGNhLThiYTE5ODNhZWUwYSIsImlhdCI6MTcwNDQ3MTk3NSwiZXhwIjoxNzA1MDc2Nzc1fQ.2AIn7Cw9pyux3p32uNLmN9TzZG-qpTnXq_cdIgHOTsM', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'd1ae19d7-bdb9-4835-a895-fbe22614c312', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYWUxOWQ3LWJkYjktNDgzNS1hODk1LWZiZTIyNjE0YzMxMiIsImlhdCI6MTcwMzg2NTk2MCwiZXhwIjoxNzA0NDcwNzYwfQ.-1wr3W-UtXz7Pwqcu7v_uP8CpLsY4Xh6Yk4HjwV4jV4', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'd3a9d86b-97be-484c-8f58-ca624213307a', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzYTlkODZiLTk3YmUtNDg0Yy04ZjU4LWNhNjI0MjEzMzA3YSIsImlhdCI6MTcwMzYwNTIwNywiZXhwIjoxNzA0MjEwMDA3fQ.qOCSCQqH8qHQreoaMA01cx9qlCZbP5KIncNsmvXDdSI', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'da47e4cd-7dcc-4251-a259-c3411381b7de', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNDdlNGNkLTdkY2MtNDI1MS1hMjU5LWMzNDExMzgxYjdkZSIsImlhdCI6MTcwNDQ2NzQwOCwiZXhwIjoxNzA1MDcyMjA4fQ.VlL4zRh7YmPHfFeLbLhGsEvJJJBbFSC0MZ8nG92Rfm0', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'da5d25f2-b88c-49b3-8fed-61f9655d5641', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhNWQyNWYyLWI4OGMtNDliMy04ZmVkLTYxZjk2NTVkNTY0MSIsImlhdCI6MTcwMzY5NTc3NSwiZXhwIjoxNzA0MzAwNTc1fQ.KWlA4_raICdV7RNbOESN-AOsM-J2IzzouTJBPYZjjpc', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'ddf0269a-f406-4d92-8c76-9682d07b46a8', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkZjAyNjlhLWY0MDYtNGQ5Mi04Yzc2LTk2ODJkMDdiNDZhOCIsImlhdCI6MTcwMzYwNDg4OSwiZXhwIjoxNzA0MjA5Njg5fQ.v6-RoQDhtihTWHVmouxP_GR8pRwk0oiNch04TqtCepw', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'e206f121-c168-4b13-bd68-0cafce038327', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMDZmMTIxLWMxNjgtNGIxMy1iZDY4LTBjYWZjZTAzODMyNyIsImlhdCI6MTcwMzY4OTYwOCwiZXhwIjoxNzA0Mjk0NDA4fQ.5eSV9nJkBOi5jJPCfRAJqnIWQobZbnLVHjUdn81O8cY', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'e577b561-a355-42c3-9815-825da263fb54', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NzdiNTYxLWEzNTUtNDJjMy05ODE1LTgyNWRhMjYzZmI1NCIsImlhdCI6MTcwNDQ2ODYwOCwiZXhwIjoxNzA1MDczNDA4fQ.3jqGjruX4tZKDv8XueFgUKUqCyfqYRpJBKh5tTDcq-A', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'ea078a2b-d1ba-4b8a-bd45-4a30f70bc2ff', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMDc4YTJiLWQxYmEtNGI4YS1iZDQ1LTRhMzBmNzBiYzJmZiIsImlhdCI6MTcwMjUzNDIwMywiZXhwIjoxNzAzMTM5MDAzfQ.uW0WS3swVxlmtJsg4AT8PQ6bOfRUp91vOHAp1IJ2Kdg', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'f2567ba2-e629-48af-82a6-aaa8833a06d2', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyNTY3YmEyLWU2MjktNDhhZi04MmE2LWFhYTg4MzNhMDZkMiIsImlhdCI6MTcwNDQ2OTUxOCwiZXhwIjoxNzA1MDc0MzE4fQ.rEzYkCnQ0X7_7oqT8z6IAxdhoBPySzrayujRO4jPe24', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'f262efd2-34df-4c13-a039-5a34f03c4524', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyNjJlZmQyLTM0ZGYtNGMxMy1hMDM5LTVhMzRmMDNjNDUyNCIsImlhdCI6MTcwNDQ3MDI0OSwiZXhwIjoxNzA1MDc1MDQ5fQ.ZEj7wc_ol-QgEIhnIVQwVlti9K8eztYVAD-XqoQYuNg', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'f5d024ba-3d57-416f-babd-576d2093ab0b', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1ZDAyNGJhLTNkNTctNDE2Zi1iYWJkLTU3NmQyMDkzYWIwYiIsImlhdCI6MTcwNDQ2NzIxOSwiZXhwIjoxNzA1MDcyMDE5fQ.DTIvoXQZB2BWejxuF8aBqvqehplW5MLsg0EeVScsbYA', N'0')
GO

INSERT INTO [dbo].[refresh_authen] ([id], [user_id], [token], [is_revoked]) VALUES (N'f660dc9b-1a0e-4c0d-820a-3740ba260660', N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2NjBkYzliLTFhMGUtNGMwZC04MjBhLTM3NDBiYTI2MDY2MCIsImlhdCI6MTcwNDU2NDI2OSwiZXhwIjoxNzA1MTY5MDY5fQ.B9Z0LUroyk5FiK1_Nwjx2WIknTuHtWDDLjtxciDAdFw', N'0')
GO

COMMIT
GO


-- ----------------------------
-- Table structure for student_grade
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[student_grade]') AND type IN ('U'))
	DROP TABLE [dbo].[student_grade]
GO

CREATE TABLE [dbo].[student_grade] (
  [student_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [grade_id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [grade] int  NULL,
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[student_grade] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of student_grade
-- ----------------------------
BEGIN TRANSACTION
GO

COMMIT
GO


-- ----------------------------
-- Table structure for sysdiagrams
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sysdiagrams]') AND type IN ('U'))
	DROP TABLE [dbo].[sysdiagrams]
GO

CREATE TABLE [dbo].[sysdiagrams] (
  [name] sysname  NOT NULL,
  [principal_id] int  NOT NULL,
  [diagram_id] int  IDENTITY(1,1) NOT NULL,
  [version] int  NULL,
  [definition] varbinary(max)  NULL
)
GO

ALTER TABLE [dbo].[sysdiagrams] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of sysdiagrams
-- ----------------------------
BEGIN TRANSACTION
GO

SET IDENTITY_INSERT [dbo].[sysdiagrams] ON
GO

SET IDENTITY_INSERT [dbo].[sysdiagrams] OFF
GO

COMMIT
GO


-- ----------------------------
-- Table structure for user
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type IN ('U'))
	DROP TABLE [dbo].[user]
GO

CREATE TABLE [dbo].[user] (
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [email] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [password] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [phone_number] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [first_name] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [last_name] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [is_verify] bit DEFAULT 0 NOT NULL,
  [reset_password_code] int  NULL,
  [image_url] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[user] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN TRANSACTION
GO

INSERT INTO [dbo].[user] ([id], [email], [password], [phone_number], [first_name], [last_name], [is_verify], [reset_password_code], [image_url]) VALUES (N'0847f5e4-6325-4945-88a3-dc00383a92e9', N'testerUser@gmail.com', N'$2b$13$MkPR4Ygkht8DPOdVSyHRzepquu7.FD5j7firGIaLpFX2YKvMX/As6', N'0123456789', N'Tester', N'Hoang', N'1', NULL, NULL)
GO

INSERT INTO [dbo].[user] ([id], [email], [password], [phone_number], [first_name], [last_name], [is_verify], [reset_password_code], [image_url]) VALUES (N'4ae2fec8-5e4e-4699-9eff-8eff9408456c', N'baokyo002@gmail.com', N'$2b$13$/G2fTCHuGLqL3U7/D3xiUeYP2cma6UevKYPrHm4smvkpI23Nlbj7S', N'0123456789', N'Bao', N'Hoang', N'1', NULL, NULL)
GO

INSERT INTO [dbo].[user] ([id], [email], [password], [phone_number], [first_name], [last_name], [is_verify], [reset_password_code], [image_url]) VALUES (N'd59d3e79-72a8-4851-ac3a-e7454069246b', N'admin@gmail.com', N'$2b$13$z0fbwEHqra5CAViFIKTNle9O5n3R.lOoSAdRLy4InNAojYJ8UJElq', N'0123456789', N'User', N'Admin', N'1', NULL, NULL)
GO

INSERT INTO [dbo].[user] ([id], [email], [password], [phone_number], [first_name], [last_name], [is_verify], [reset_password_code], [image_url]) VALUES (N'dcc13821-19de-4559-8305-73166b5eeb4d', N'truongtrongkhanhcm@gmail.com', N'$2b$13$ii.5BMSkdMKSZXmzfI5hGe8tJ/F8l0Zsf/Yx98j1YXTFGVmOBpfuG', N'undefined', N'undefined', N'undefined', N'0', NULL, NULL)
GO

COMMIT
GO


-- ----------------------------
-- procedure structure for sp_upgraddiagrams
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_upgraddiagrams]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_upgraddiagrams]
GO

CREATE PROCEDURE [dbo].[sp_upgraddiagrams]
	AS
	BEGIN
		IF OBJECT_ID(N'dbo.sysdiagrams') IS NOT NULL
			return 0;
	
		CREATE TABLE dbo.sysdiagrams
		(
			name sysname NOT NULL,
			principal_id int NOT NULL,	-- we may change it to varbinary(85)
			diagram_id int PRIMARY KEY IDENTITY,
			version int,
	
			definition varbinary(max)
			CONSTRAINT UK_principal_name UNIQUE
			(
				principal_id,
				name
			)
		);


		/* Add this if we need to have some form of extended properties for diagrams */
		/*
		IF OBJECT_ID(N'dbo.sysdiagram_properties') IS NULL
		BEGIN
			CREATE TABLE dbo.sysdiagram_properties
			(
				diagram_id int,
				name sysname,
				value varbinary(max) NOT NULL
			)
		END
		*/

		IF OBJECT_ID(N'dbo.dtproperties') IS NOT NULL
		begin
			insert into dbo.sysdiagrams
			(
				[name],
				[principal_id],
				[version],
				[definition]
			)
			select	 
				convert(sysname, dgnm.[uvalue]),
				DATABASE_PRINCIPAL_ID(N'dbo'),			-- will change to the sid of sa
				0,							-- zero for old format, dgdef.[version],
				dgdef.[lvalue]
			from dbo.[dtproperties] dgnm
				inner join dbo.[dtproperties] dggd on dggd.[property] = 'DtgSchemaGUID' and dggd.[objectid] = dgnm.[objectid]	
				inner join dbo.[dtproperties] dgdef on dgdef.[property] = 'DtgSchemaDATA' and dgdef.[objectid] = dgnm.[objectid]
				
			where dgnm.[property] = 'DtgSchemaNAME' and dggd.[uvalue] like N'_EA3E6268-D998-11CE-9454-00AA00A3F36E_' 
			return 2;
		end
		return 1;
	END
GO


-- ----------------------------
-- procedure structure for sp_helpdiagrams
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_helpdiagrams]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_helpdiagrams]
GO

CREATE PROCEDURE [dbo].[sp_helpdiagrams]
	(
		@diagramname sysname = NULL,
		@owner_id int = NULL
	)
	WITH EXECUTE AS N'dbo'
	AS
	BEGIN
		DECLARE @user sysname
		DECLARE @dboLogin bit
		EXECUTE AS CALLER;
			SET @user = USER_NAME();
			SET @dboLogin = CONVERT(bit,IS_MEMBER('db_owner'));
		REVERT;
		SELECT
			[Database] = DB_NAME(),
			[Name] = name,
			[ID] = diagram_id,
			[Owner] = USER_NAME(principal_id),
			[OwnerID] = principal_id
		FROM
			sysdiagrams
		WHERE
			(@dboLogin = 1 OR USER_NAME(principal_id) = @user) AND
			(@diagramname IS NULL OR name = @diagramname) AND
			(@owner_id IS NULL OR principal_id = @owner_id)
		ORDER BY
			4, 5, 1
	END
GO


-- ----------------------------
-- procedure structure for sp_helpdiagramdefinition
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_helpdiagramdefinition]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_helpdiagramdefinition]
GO

CREATE PROCEDURE [dbo].[sp_helpdiagramdefinition]
	(
		@diagramname 	sysname,
		@owner_id	int	= null 		
	)
	WITH EXECUTE AS N'dbo'
	AS
	BEGIN
		set nocount on

		declare @theId 		int
		declare @IsDbo 		int
		declare @DiagId		int
		declare @UIDFound	int
	
		if(@diagramname is null)
		begin
			RAISERROR (N'E_INVALIDARG', 16, 1);
			return -1
		end
	
		execute as caller;
		select @theId = DATABASE_PRINCIPAL_ID();
		select @IsDbo = IS_MEMBER(N'db_owner');
		if(@owner_id is null)
			select @owner_id = @theId;
		revert; 
	
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname;
		if(@DiagId IS NULL or (@IsDbo = 0 and @UIDFound <> @theId ))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1);
			return -3
		end

		select version, definition FROM dbo.sysdiagrams where diagram_id = @DiagId ; 
		return 0
	END
GO


-- ----------------------------
-- procedure structure for sp_creatediagram
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_creatediagram]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_creatediagram]
GO

CREATE PROCEDURE [dbo].[sp_creatediagram]
	(
		@diagramname 	sysname,
		@owner_id		int	= null, 	
		@version 		int,
		@definition 	varbinary(max)
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
	
		declare @theId int
		declare @retval int
		declare @IsDbo	int
		declare @userName sysname
		if(@version is null or @diagramname is null)
		begin
			RAISERROR (N'E_INVALIDARG', 16, 1);
			return -1
		end
	
		execute as caller;
		select @theId = DATABASE_PRINCIPAL_ID(); 
		select @IsDbo = IS_MEMBER(N'db_owner');
		revert; 
		
		if @owner_id is null
		begin
			select @owner_id = @theId;
		end
		else
		begin
			if @theId <> @owner_id
			begin
				if @IsDbo = 0
				begin
					RAISERROR (N'E_INVALIDARG', 16, 1);
					return -1
				end
				select @theId = @owner_id
			end
		end
		-- next 2 line only for test, will be removed after define name unique
		if EXISTS(select diagram_id from dbo.sysdiagrams where principal_id = @theId and name = @diagramname)
		begin
			RAISERROR ('The name is already used.', 16, 1);
			return -2
		end
	
		insert into dbo.sysdiagrams(name, principal_id , version, definition)
				VALUES(@diagramname, @theId, @version, @definition) ;
		
		select @retval = @@IDENTITY 
		return @retval
	END
GO


-- ----------------------------
-- procedure structure for sp_renamediagram
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_renamediagram]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_renamediagram]
GO

CREATE PROCEDURE [dbo].[sp_renamediagram]
	(
		@diagramname 		sysname,
		@owner_id		int	= null,
		@new_diagramname	sysname
	
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
		declare @theId 			int
		declare @IsDbo 			int
		
		declare @UIDFound 		int
		declare @DiagId			int
		declare @DiagIdTarg		int
		declare @u_name			sysname
		if((@diagramname is null) or (@new_diagramname is null))
		begin
			RAISERROR ('Invalid value', 16, 1);
			return -1
		end
	
		EXECUTE AS CALLER;
		select @theId = DATABASE_PRINCIPAL_ID();
		select @IsDbo = IS_MEMBER(N'db_owner'); 
		if(@owner_id is null)
			select @owner_id = @theId;
		REVERT;
	
		select @u_name = USER_NAME(@owner_id)
	
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 
		if(@DiagId IS NULL or (@IsDbo = 0 and @UIDFound <> @theId))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1)
			return -3
		end
	
		-- if((@u_name is not null) and (@new_diagramname = @diagramname))	-- nothing will change
		--	return 0;
	
		if(@u_name is null)
			select @DiagIdTarg = diagram_id from dbo.sysdiagrams where principal_id = @theId and name = @new_diagramname
		else
			select @DiagIdTarg = diagram_id from dbo.sysdiagrams where principal_id = @owner_id and name = @new_diagramname
	
		if((@DiagIdTarg is not null) and  @DiagId <> @DiagIdTarg)
		begin
			RAISERROR ('The name is already used.', 16, 1);
			return -2
		end		
	
		if(@u_name is null)
			update dbo.sysdiagrams set [name] = @new_diagramname, principal_id = @theId where diagram_id = @DiagId
		else
			update dbo.sysdiagrams set [name] = @new_diagramname where diagram_id = @DiagId
		return 0
	END
GO


-- ----------------------------
-- procedure structure for sp_alterdiagram
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_alterdiagram]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_alterdiagram]
GO

CREATE PROCEDURE [dbo].[sp_alterdiagram]
	(
		@diagramname 	sysname,
		@owner_id	int	= null,
		@version 	int,
		@definition 	varbinary(max)
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
	
		declare @theId 			int
		declare @retval 		int
		declare @IsDbo 			int
		
		declare @UIDFound 		int
		declare @DiagId			int
		declare @ShouldChangeUID	int
	
		if(@diagramname is null)
		begin
			RAISERROR ('Invalid ARG', 16, 1)
			return -1
		end
	
		execute as caller;
		select @theId = DATABASE_PRINCIPAL_ID();	 
		select @IsDbo = IS_MEMBER(N'db_owner'); 
		if(@owner_id is null)
			select @owner_id = @theId;
		revert;
	
		select @ShouldChangeUID = 0
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 
		
		if(@DiagId IS NULL or (@IsDbo = 0 and @theId <> @UIDFound))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1);
			return -3
		end
	
		if(@IsDbo <> 0)
		begin
			if(@UIDFound is null or USER_NAME(@UIDFound) is null) -- invalid principal_id
			begin
				select @ShouldChangeUID = 1 ;
			end
		end

		-- update dds data			
		update dbo.sysdiagrams set definition = @definition where diagram_id = @DiagId ;

		-- change owner
		if(@ShouldChangeUID = 1)
			update dbo.sysdiagrams set principal_id = @theId where diagram_id = @DiagId ;

		-- update dds version
		if(@version is not null)
			update dbo.sysdiagrams set version = @version where diagram_id = @DiagId ;

		return 0
	END
GO


-- ----------------------------
-- procedure structure for sp_dropdiagram
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_dropdiagram]') AND type IN ('P', 'PC', 'RF', 'X'))
	DROP PROCEDURE[dbo].[sp_dropdiagram]
GO

CREATE PROCEDURE [dbo].[sp_dropdiagram]
	(
		@diagramname 	sysname,
		@owner_id	int	= null
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
		declare @theId 			int
		declare @IsDbo 			int
		
		declare @UIDFound 		int
		declare @DiagId			int
	
		if(@diagramname is null)
		begin
			RAISERROR ('Invalid value', 16, 1);
			return -1
		end
	
		EXECUTE AS CALLER;
		select @theId = DATABASE_PRINCIPAL_ID();
		select @IsDbo = IS_MEMBER(N'db_owner'); 
		if(@owner_id is null)
			select @owner_id = @theId;
		REVERT; 
		
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 
		if(@DiagId IS NULL or (@IsDbo = 0 and @UIDFound <> @theId))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1)
			return -3
		end
	
		delete from dbo.sysdiagrams where diagram_id = @DiagId;
	
		return 0;
	END
GO


-- ----------------------------
-- function structure for fn_diagramobjects
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[fn_diagramobjects]') AND type IN ('FN', 'FS', 'FT', 'IF', 'TF'))
	DROP FUNCTION[dbo].[fn_diagramobjects]
GO

CREATE FUNCTION [dbo].[fn_diagramobjects]() 
	RETURNS int
	WITH EXECUTE AS N'dbo'
	AS
	BEGIN
		declare @id_upgraddiagrams		int
		declare @id_sysdiagrams			int
		declare @id_helpdiagrams		int
		declare @id_helpdiagramdefinition	int
		declare @id_creatediagram	int
		declare @id_renamediagram	int
		declare @id_alterdiagram 	int 
		declare @id_dropdiagram		int
		declare @InstalledObjects	int

		select @InstalledObjects = 0

		select 	@id_upgraddiagrams = object_id(N'dbo.sp_upgraddiagrams'),
			@id_sysdiagrams = object_id(N'dbo.sysdiagrams'),
			@id_helpdiagrams = object_id(N'dbo.sp_helpdiagrams'),
			@id_helpdiagramdefinition = object_id(N'dbo.sp_helpdiagramdefinition'),
			@id_creatediagram = object_id(N'dbo.sp_creatediagram'),
			@id_renamediagram = object_id(N'dbo.sp_renamediagram'),
			@id_alterdiagram = object_id(N'dbo.sp_alterdiagram'), 
			@id_dropdiagram = object_id(N'dbo.sp_dropdiagram')

		if @id_upgraddiagrams is not null
			select @InstalledObjects = @InstalledObjects + 1
		if @id_sysdiagrams is not null
			select @InstalledObjects = @InstalledObjects + 2
		if @id_helpdiagrams is not null
			select @InstalledObjects = @InstalledObjects + 4
		if @id_helpdiagramdefinition is not null
			select @InstalledObjects = @InstalledObjects + 8
		if @id_creatediagram is not null
			select @InstalledObjects = @InstalledObjects + 16
		if @id_renamediagram is not null
			select @InstalledObjects = @InstalledObjects + 32
		if @id_alterdiagram  is not null
			select @InstalledObjects = @InstalledObjects + 64
		if @id_dropdiagram is not null
			select @InstalledObjects = @InstalledObjects + 128
		
		return @InstalledObjects 
	END
GO


-- ----------------------------
-- Primary Key structure for table classroom
-- ----------------------------
ALTER TABLE [dbo].[classroom] ADD CONSTRAINT [PK__classroo__C2290F480DC4F2A8] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table classroom_grade
-- ----------------------------
ALTER TABLE [dbo].[classroom_grade] ADD CONSTRAINT [PK__classroo__3213E83FA7CF8820] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table classroom_student
-- ----------------------------
ALTER TABLE [dbo].[classroom_student] ADD CONSTRAINT [PK__classroo__BE7BEF918B7E2CC2] PRIMARY KEY CLUSTERED ([student_id], [classroom_id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table classroom_teacher
-- ----------------------------
ALTER TABLE [dbo].[classroom_teacher] ADD CONSTRAINT [PK__classroo__97E69E755AD236EC] PRIMARY KEY CLUSTERED ([teacher_id], [classroom_id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table refresh_authen
-- ----------------------------
ALTER TABLE [dbo].[refresh_authen] ADD CONSTRAINT [PK__refresh___3213E83F117C6EAC] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table student_grade
-- ----------------------------
ALTER TABLE [dbo].[student_grade] ADD CONSTRAINT [PK__student___3213E83F5FFB65CE] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for sysdiagrams
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[sysdiagrams]', RESEED, 1)
GO


-- ----------------------------
-- Uniques structure for table sysdiagrams
-- ----------------------------
ALTER TABLE [dbo].[sysdiagrams] ADD CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id] ASC, [name] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table sysdiagrams
-- ----------------------------
ALTER TABLE [dbo].[sysdiagrams] ADD CONSTRAINT [PK__sysdiagr__C2B05B61D0D5D5DC] PRIMARY KEY CLUSTERED ([diagram_id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE [dbo].[user] ADD CONSTRAINT [PK__user__3213E83F35D71ADF] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table classroom_grade
-- ----------------------------
ALTER TABLE [dbo].[classroom_grade] ADD CONSTRAINT [FK_class_id] FOREIGN KEY ([classroom_id]) REFERENCES [dbo].[classroom] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO


-- ----------------------------
-- Foreign Keys structure for table classroom_student
-- ----------------------------
ALTER TABLE [dbo].[classroom_student] ADD CONSTRAINT [LK_student_id] FOREIGN KEY ([student_id]) REFERENCES [dbo].[user] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [dbo].[classroom_student] ADD CONSTRAINT [LK_classroom_id] FOREIGN KEY ([classroom_id]) REFERENCES [dbo].[classroom] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO


-- ----------------------------
-- Foreign Keys structure for table classroom_teacher
-- ----------------------------
ALTER TABLE [dbo].[classroom_teacher] ADD CONSTRAINT [FK_user_teacher_id] FOREIGN KEY ([teacher_id]) REFERENCES [dbo].[user] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [dbo].[classroom_teacher] ADD CONSTRAINT [FK_classroom_classroom_id] FOREIGN KEY ([classroom_id]) REFERENCES [dbo].[classroom] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO


-- ----------------------------
-- Foreign Keys structure for table refresh_authen
-- ----------------------------
ALTER TABLE [dbo].[refresh_authen] ADD CONSTRAINT [fk_user_id] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO


-- ----------------------------
-- Foreign Keys structure for table student_grade
-- ----------------------------
ALTER TABLE [dbo].[student_grade] ADD CONSTRAINT [FK_user] FOREIGN KEY ([student_id]) REFERENCES [dbo].[user] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [dbo].[student_grade] ADD CONSTRAINT [FK_grade] FOREIGN KEY ([grade_id]) REFERENCES [dbo].[classroom_grade] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

