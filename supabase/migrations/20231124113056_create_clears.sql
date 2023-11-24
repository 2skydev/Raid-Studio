create table "public"."clears" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "raid_name" text not null,
    "raid_step" smallint not null,
    "raid_difficulty" text not null,
    "cleared_at" date not null default CURRENT_DATE,
    "character_id" text not null
);


alter table "public"."clears" enable row level security;

CREATE UNIQUE INDEX characters_id_key ON public.characters USING btree (id);

CREATE UNIQUE INDEX clears_pkey ON public.clears USING btree (id, user_id, character_id);

alter table "public"."clears" add constraint "clears_pkey" PRIMARY KEY using index "clears_pkey";

alter table "public"."characters" add constraint "characters_id_key" UNIQUE using index "characters_id_key";

alter table "public"."clears" add constraint "clears_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE not valid;

alter table "public"."clears" validate constraint "clears_character_id_fkey";

alter table "public"."clears" add constraint "clears_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."clears" validate constraint "clears_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_return_null()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  return null;
end;$function$
;

create policy "자신의 ID에 해당되는 데이터만 삭제 가능"
on "public"."characters"
as permissive
for delete
to authenticated
using (((auth.uid() = user_id) AND (is_test_user() = false)));


create policy "모든 사람 읽기 가능"
on "public"."clears"
as permissive
for select
to public
using (true);


create policy "자신의 ID로만 생성 가능"
on "public"."clears"
as permissive
for insert
to authenticated
with check (((auth.uid() = user_id) AND (is_test_user() = false)));


create policy "자신의 ID에 해당되는 데이터만 삭제 가능"
on "public"."clears"
as permissive
for delete
to authenticated
using (((auth.uid() = user_id) AND (is_test_user() = false)));


create policy "자신의 ID에 해당되는 데이터만 수정 가능"
on "public"."clears"
as permissive
for update
to authenticated
using (((auth.uid() = user_id) AND (is_test_user() = false)))
with check ((auth.uid() = user_id));



