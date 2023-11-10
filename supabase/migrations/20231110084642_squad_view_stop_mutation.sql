set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_return_null()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  return null;
end;$function$
;

CREATE TRIGGER stop_mutation_squads_public_view INSTEAD OF INSERT OR DELETE OR UPDATE ON public.squads_public_view FOR EACH ROW EXECUTE FUNCTION trigger_return_null();


