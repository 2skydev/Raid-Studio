alter table "public"."profiles" add constraint "profiles_nickname_check" CHECK ((nickname ~ '^[a-zA-Z0-9가-힣\s]{1,12}$'::text)) not valid;

alter table "public"."profiles" validate constraint "profiles_nickname_check";

alter table "public"."squads" add constraint "squads_code_check" CHECK ((code ~ '^[a-zA-Z0-9가-힣\s\_\-]{1,30}$'::text)) not valid;

alter table "public"."squads" validate constraint "squads_code_check";

alter table "public"."squads" add constraint "squads_name_check" CHECK ((name ~ '^[a-zA-Z0-9가-힣\s]{1,12}$'::text)) not valid;

alter table "public"."squads" validate constraint "squads_name_check";


