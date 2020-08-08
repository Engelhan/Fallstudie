-- Table: public.Projects

--DROP TABLE public."Projects";

CREATE TABLE "Projects"
(
    "ProjectId" serial NOT NULL,
    "ProjectName" text COLLATE pg_catalog."default" NOT NULL,
    "PlannedSales" integer,
    "PlannedProfit" integer,
    "EstimatedCosts" integer,
    "CostSavings" integer,
    "PaybackPeriod" integer,
    "Rentability" integer,
    "StaffCosts" integer,
    "StaffHours" integer,
    "EmployeeNumber" integer,
    "EmployeeSales" integer,
    "AverageHourlyRate" integer,
    "ProfitPerHour" integer,
    "TimeExpenditure" integer,
    "EndDate" date,
    "CustomerPriority" integer,
    "TimeBuffer" integer, 
    "RiskExpectedValue" integer,
    "Ranking" integer,
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
    "Username" text COLLATE pg_catalog."default" NOT NULL,
    "Password" text COLLATE pg_catalog."default" NOT NULL,
    "RoleId" integer,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId"),
    CONSTRAINT "Role_fkey" FOREIGN KEY ("RoleId") REFERENCES Roles("RoleId")
)

TABLESPACE pg_default;

ALTER TABLE public."Projects" OWNER to mk;