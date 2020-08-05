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

ALTER TABLE public."Projects" OWNER to mk;