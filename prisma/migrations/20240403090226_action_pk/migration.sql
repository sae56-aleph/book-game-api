-- AlterTable
CREATE SEQUENCE action_id_seq;
ALTER TABLE "Action" ALTER COLUMN "id" SET DEFAULT nextval('action_id_seq');
ALTER SEQUENCE action_id_seq OWNED BY "Action"."id";

-- AlterTable
CREATE SEQUENCE actioncombat_id_seq;
ALTER TABLE "ActionCombat" ALTER COLUMN "id" SET DEFAULT nextval('actioncombat_id_seq');
ALTER SEQUENCE actioncombat_id_seq OWNED BY "ActionCombat"."id";

-- AlterTable
CREATE SEQUENCE actioncondition_id_seq;
ALTER TABLE "ActionCondition" ALTER COLUMN "id" SET DEFAULT nextval('actioncondition_id_seq');
ALTER SEQUENCE actioncondition_id_seq OWNED BY "ActionCondition"."id";

-- AlterTable
CREATE SEQUENCE actionde_id_seq;
ALTER TABLE "ActionDe" ALTER COLUMN "id" SET DEFAULT nextval('actionde_id_seq');
ALTER SEQUENCE actionde_id_seq OWNED BY "ActionDe"."id";

-- AlterTable
CREATE SEQUENCE actionenigme_id_seq;
ALTER TABLE "ActionEnigme" ALTER COLUMN "id" SET DEFAULT nextval('actionenigme_id_seq');
ALTER SEQUENCE actionenigme_id_seq OWNED BY "ActionEnigme"."id";

-- AlterTable
CREATE SEQUENCE actionsimple_id_seq;
ALTER TABLE "ActionSimple" ALTER COLUMN "id" SET DEFAULT nextval('actionsimple_id_seq');
ALTER SEQUENCE actionsimple_id_seq OWNED BY "ActionSimple"."id";
