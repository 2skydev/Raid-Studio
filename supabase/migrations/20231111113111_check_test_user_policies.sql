drop policy "자신의 ID로만 생성 가능" on "public"."characters";

drop policy "자신의 ID에 해당되는 데이터만 수정 가능" on "public"."characters";

drop policy "자신의 ID로만 생성 가능" on "public"."profiles";

drop policy "자신의 ID에 해당되는 데이터만 수정 가능" on "public"."profiles";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_test_user()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$begin
  return (
    select count(*)
    from public.profiles
    where
      auth.uid() = id and
      nickname in ('user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10')
  );
end;$function$
;

create policy "자신의 ID로만 생성 가능"
on "public"."characters"
as permissive
for insert
to authenticated
with check (((auth.uid() = user_id) AND (is_test_user() = false)));


create policy "자신의 ID에 해당되는 데이터만 수정 가능"
on "public"."characters"
as permissive
for update
to authenticated
using (((auth.uid() = user_id) AND (is_test_user() = false)))
with check ((auth.uid() = user_id));


create policy "자신의 ID로만 생성 가능"
on "public"."profiles"
as permissive
for insert
to authenticated
with check (((auth.uid() = id) AND (is_test_user() = false)));


create policy "자신의 ID에 해당되는 데이터만 수정 가능"
on "public"."profiles"
as permissive
for update
to authenticated
using (((auth.uid() = id) AND (is_test_user() = false)))
with check ((auth.uid() = id));



