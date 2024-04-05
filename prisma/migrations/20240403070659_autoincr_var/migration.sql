-- CreateEnum
CREATE TYPE "TypeVariable" AS ENUM ('Statistique', 'Inventaire');

-- CreateTable
CREATE TABLE "Livre" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "couverture" TEXT NOT NULL,
    "idIntro" INTEGER,

    CONSTRAINT "Livre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "texte" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "idLivre" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variable" (
    "id" SERIAL NOT NULL,
    "valeurInitale" INTEGER NOT NULL,
    "type" "TypeVariable" NOT NULL,
    "idLivre" INTEGER NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiseAJourVar" (
    "quantite" INTEGER NOT NULL,
    "idSection" INTEGER NOT NULL,
    "idVariable" INTEGER NOT NULL,

    CONSTRAINT "MiseAJourVar_pkey" PRIMARY KEY ("idVariable","idSection")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "idOrigine" INTEGER NOT NULL,
    "idDestination" INTEGER NOT NULL,

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
    "idDestinationEchec" INTEGER,
    "idAction" INTEGER NOT NULL,

    CONSTRAINT "ActionCombat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionDe" (
    "id" INTEGER NOT NULL,
    "seuil" TEXT NOT NULL,
    "idAction" INTEGER NOT NULL,
    "idDestinationEchec" INTEGER,

    CONSTRAINT "ActionDe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionEnigme" (
    "id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "reponse" TEXT NOT NULL,
    "idAction" INTEGER NOT NULL,

    CONSTRAINT "ActionEnigme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Livre_idIntro_key" ON "Livre"("idIntro");

-- CreateIndex
CREATE UNIQUE INDEX "Section_numero_idLivre_key" ON "Section"("numero", "idLivre");

-- CreateIndex
CREATE UNIQUE INDEX "Action_idOrigine_key" ON "Action"("idOrigine");

-- CreateIndex
CREATE UNIQUE INDEX "Action_idDestination_key" ON "Action"("idDestination");

-- CreateIndex
CREATE UNIQUE INDEX "ActionSimple_idAction_key" ON "ActionSimple"("idAction");

-- CreateIndex
CREATE UNIQUE INDEX "ActionCondition_idAction_key" ON "ActionCondition"("idAction");

-- CreateIndex
CREATE UNIQUE INDEX "ActionCombat_idAction_key" ON "ActionCombat"("idAction");

-- CreateIndex
CREATE UNIQUE INDEX "ActionDe_idAction_key" ON "ActionDe"("idAction");

-- CreateIndex
CREATE UNIQUE INDEX "ActionEnigme_idAction_key" ON "ActionEnigme"("idAction");

-- AddForeignKey
ALTER TABLE "Livre" ADD CONSTRAINT "Livre_idIntro_fkey" FOREIGN KEY ("idIntro") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_idLivre_fkey" FOREIGN KEY ("idLivre") REFERENCES "Livre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_idLivre_fkey" FOREIGN KEY ("idLivre") REFERENCES "Livre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiseAJourVar" ADD CONSTRAINT "MiseAJourVar_idSection_fkey" FOREIGN KEY ("idSection") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiseAJourVar" ADD CONSTRAINT "MiseAJourVar_idVariable_fkey" FOREIGN KEY ("idVariable") REFERENCES "Variable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_idOrigine_fkey" FOREIGN KEY ("idOrigine") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_idDestination_fkey" FOREIGN KEY ("idDestination") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionSimple" ADD CONSTRAINT "ActionSimple_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionCondition" ADD CONSTRAINT "ActionCondition_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionCombat" ADD CONSTRAINT "ActionCombat_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionCombat" ADD CONSTRAINT "ActionCombat_idDestinationEchec_fkey" FOREIGN KEY ("idDestinationEchec") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionDe" ADD CONSTRAINT "ActionDe_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionDe" ADD CONSTRAINT "ActionDe_idDestinationEchec_fkey" FOREIGN KEY ("idDestinationEchec") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionEnigme" ADD CONSTRAINT "ActionEnigme_idAction_fkey" FOREIGN KEY ("idAction") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
