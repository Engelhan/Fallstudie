-- Table: public.Projects

--DROP TABLE public."Projects";

CREATE TABLE "Projects"
(
    "ProjectId" serial NOT NULL,
    "ProjectName" text COLLATE pg_catalog."default" NOT NULL,
    "Size" integer,
    "Prio" integer,
    "Active" boolean,
    CONSTRAINT "Projects_pkey" PRIMARY KEY ("ProjectId")
)

TABLESPACE pg_default;

ALTER TABLE public."Projects" OWNER to mk;