-- Table: public.Projects

--DROP TABLE public."Projects";

CREATE TABLE "Projects"
(
    "ProjectId" serial NOT NULL,
    "ProjectName" text COLLATE pg_catalog."default" NOT NULL,
    "PlannedSales" integer,
    "PlannedProfit" integer,
    "EstimatedCosts" integer,
    "StaffCosts" integer,
    "StaffHours" integer,
    "EmployeeNumber" integer,
    "TimeExpenditure" integer,
    "EndDate" date,
    "CustomerPriority" integer,
    "CustomerSales" integer,
    CONSTRAINT "Projects_pkey" PRIMARY KEY ("ProjectId")
)

TABLESPACE pg_default;

CREATE TABLE "Roles"
(
    "RoleId" serial NOT NULL,
    "RoleName" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY ("RoleId")
)

TABLESPACE pg_default;

CREATE TABLE "Users"
(
    "UserId" serial NOT NULL,
    "Firstname" text COLLATE pg_catalog."default" NOT NULL,
    "Lastname" text COLLATE pg_catalog."default" NOT NULL,
    "RoleId" integer,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId"),
    CONSTRAINT "Role_fkey" FOREIGN KEY ("RoleId") REFERENCES Roles("RoleId")
)

TABLESPACE pg_default;

ALTER TABLE public."Projects" OWNER to mk;