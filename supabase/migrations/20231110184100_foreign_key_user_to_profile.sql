create type "public"."squad_role" as enum ('owner', 'normal');

drop trigger if exists "stop_mutation_squads_public_view" on "public"."squads_public_view";

drop policy "자신의 ID로만 생성 가능" on "public"."squads";

drop policy "자신의 ID에 해당되는 데이터만 수정 가능" on "public"."squads";

alter table "public"."squads" drop constraint "squads_owner_id_fkey";

alter table "public"."characters" drop constraint "characters_user_id_fkey";

alter table "public"."squad_users" drop constraint "squad_users_user_id_fkey";

drop view if exists "public"."squads_public_view";

alter table "public"."squad_users" add column "role" squad_role not null default 'normal'::squad_role;

alter table "public"."squads" drop column "owner_id";

alter table "public"."characters" add constraint "characters_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."characters" validate constraint "characters_user_id_fkey";

alter table "public"."squad_users" add constraint "squad_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."squad_users" validate constraint "squad_users_user_id_fkey";

create or replace view "public"."squads_public_view" as  SELECT squads.id,
    squads.name,
    squads.created_at
   FROM squads;


CREATE TRIGGER stop_mutation_squads_public_view INSTEAD OF INSERT OR DELETE OR UPDATE ON public.squads_public_view FOR EACH ROW EXECUTE FUNCTION trigger_return_null();


