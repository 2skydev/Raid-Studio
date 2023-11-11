alter table "public"."characters" drop constraint "characters_pkey";

alter table "public"."squad_users" drop constraint "squad_users_pkey";

drop index if exists "public"."characters_pkey";

drop index if exists "public"."squad_users_pkey";

CREATE UNIQUE INDEX characters_pkey ON public.characters USING btree (id, user_id);

CREATE UNIQUE INDEX squad_users_pkey ON public.squad_users USING btree (squad_id, id, user_id);

alter table "public"."characters" add constraint "characters_pkey" PRIMARY KEY using index "characters_pkey";

alter table "public"."squad_users" add constraint "squad_users_pkey" PRIMARY KEY using index "squad_users_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_return_null()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  return null;
end;$function$
;


