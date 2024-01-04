insert into "storage"."buckets" (id, name, public, file_size_limit)
values ('profile-photos', 'profile-photos', true, 1048576)
on conflict (id) do nothing;

create policy "프로필 사진 정책 zhjthq_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'profile-photos'::text) AND (is_test_user() = false) AND (array_length(storage.foldername(name), 1) IS NULL) AND (storage.filename(name) = ((auth.uid())::text || '.png'::text))));


create policy "프로필 사진 정책 zhjthq_1"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'profile-photos'::text) AND (is_test_user() = false) AND (array_length(storage.foldername(name), 1) IS NULL) AND (storage.filename(name) = ((auth.uid())::text || '.png'::text))));


create policy "프로필 사진 정책 zhjthq_2"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'profile-photos'::text) AND (is_test_user() = false) AND (array_length(storage.foldername(name), 1) IS NULL) AND (storage.filename(name) = ((auth.uid())::text || '.png'::text))));



