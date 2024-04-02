-- CreateEnum
CREATE TYPE "TypeVariable" AS ENUM ('Statistique', 'Inventaire');

-- CreateTable
CREATE TABLE "Livre" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Livre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variable" (
    "id" INTEGER NOT NULL,
    "valeur_initale" INTEGER NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiseAJourVar" (
    "id" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "MiseAJourVar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL,
    "texte" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionSimple" (
    "id" INTEGER NOT NULL,
    "idAction" INTEGER NOT NULL,

    CONSTRAINT "ActionSimple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionCondition" (
    "id" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "idAction" INTEGER NOT NULL,

    CONSTRAINT "ActionCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionCombat" (
    "id" INTEGER NOT NULL,
    "nom_ennemi" TEXT NOT NULL,
    "idAction" INTEGER NOT NULL,

    CONSTRAINT "ActionCombat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionDe" (
    "id" INTEGER NOT NULL,
    "seuil" TEXT NOT NULL,
    "idAction" INTEGER NOT NULL,

    CONSTRAINT "ActionDe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActionSimple" ADD CONSTRAINT "ActionSimple_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionCondition" ADD CONSTRAINT "ActionCondition_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionCombat" ADD CONSTRAINT "ActionCombat_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionDe" ADD CONSTRAINT "ActionDe_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
