-- 테스트용 유저 생성
INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) (
    select
      '00000000-0000-0000-0000-000000000000',
      uuid_generate_v4(),
      'authenticated',
      'authenticated',
      'user' || (ROW_NUMBER() OVER ()) || '@example.com',
      crypt ('password123', gen_salt ('bf')),
      current_timestamp,
      current_timestamp,
      current_timestamp,
      '{"provider":"email","providers":["email"]}',
      '{}',
      current_timestamp,
      current_timestamp,
      '',
      '',
      '',
      ''
    FROM
      generate_series(1, 10)
  );

-- 테스트용 유저 생성
INSERT INTO
  auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) (
    select
      uuid_generate_v4(),
      id,
      format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
      'email',
      current_timestamp,
      current_timestamp,
      current_timestamp
    from
      auth.users
  );

-- 테스트용 프로필 생성
INSERT INTO
  public.profiles (
    id,
    photo,
    nickname,
    main_character_name
  ) (
    select
      id,
      format('https://raw.githubusercontent.com/2skydev/assets/main/discord-default-profiles/%s.png', ((ROW_NUMBER() OVER () - 1) % 5 + 1)::text),
      'user' || (ROW_NUMBER() OVER ()),
      '풍선알바'
    from
      auth.users
  );

-- 테스트용 공격대 생성
INSERT INTO
  public.squads (
    name,
    code,
    owner_id
  )
VALUES
  (
    '테스트 공격대-8', 'test-code8', (select id from public.profiles limit 1)
  ),
  (
    '테스트 공격대-10', 'test-code10', (select id from public.profiles limit 1 offset 1)
  );

-- 테스트용 공격대 유저 생성
INSERT INTO
  public.squad_users (
    user_id,
    squad_id
  ) (
    select
      id,
      1
    from
      public.profiles
    limit 8
  );
INSERT INTO
  public.squad_users (
    user_id,
    squad_id
  ) (
    select
      id,
      2
    from
      public.profiles
  );

-- 테스트용 캐릭터 생성
with temp_characters (server, name, level, class, n) as (
  select '아만', '나중에캐릭명바꿀게요', 1540, '서머너', '1' union all
  select '아만', '낭만있는레몬헌터', 1600, '데빌헌터', '1' union all
  select '아만', '책임없는망치', 1475, '디스트로이어', '1' union all
  select '아만', '제발요잘할게요', 1445, '리퍼', '1' union all
  select '아만', '스트릿출신유미', 1622.5, '워로드', '1' union all
  select '아만', '풍선알바', 1589.17, '스트라이커', '1' union all
  select '아만', '검은고양이네', 1580.83, '버서커', '1' union all

  select '루페온', '미시쥬니', 1600, '서머너', '2' union all
  select '루페온', '단단한쥬니', 1583.33, '워로드', '2' union all
  select '루페온', '젖은쥬니', 1580.83, '기상술사', '2' union all
  select '루페온', '탱크쥬니', 1613.33, '블래스터', '2' union all
  select '루페온', '돌잡이때스나이퍼잡았는데', 1528.33, '건슬링어', '2' union all
  select '루페온', '경쥬니', 1631.67, '건슬링어', '2' union all
  select '루페온', '양국순', 1570, '바드', '2' union all

  select '니나브', '국똘이터', 1600, '소울이터', '3' union all
  select '니나브', '대검사국똘이', 1600, '슬레이어', '3' union all
  select '니나브', '국똘우산', 1543.33, '기상술사', '3' union all
  select '니나브', '국똘이이', 1581.67, '창술사', '3' union all
  select '니나브', '국똘데빌', 1620, '데빌헌터', '3' union all
  select '니나브', '국똘이', 1630, '데모닉', '3' union all
  select '니나브', '양국진', 1600, '블레이드', '3' union all

  select '니나브', '아기유정이', 1600, '바드', '4' union all
  select '니나브', '유졍이', 1592.5, '바드', '4' union all
  select '니나브', '요정은하프만연주해', 1590, '바드', '4' union all
  select '니나브', '요정은크로플만먹어', 1620, '바드', '4' union all
  select '니나브', '요정은그림만그려', 1505, '도화가', '4' union all
  select '니나브', '요정은스콘만먹어', 1600, '바드', '4' union all
  select '니나브', '요정은참이슬안먹어', 1630.83, '바드', '4' union all
  select '니나브', '요정은이슬만먹어', 1560, '소서리스', '4' union all

  select '아만', '하사망', 1582.5, '소울이터', '5' union all
  select '아만', '하도심', 1582.5, '아르카나', '5' union all
  select '아만', '하묵비', 1540, '리퍼', '5' union all
  select '아만', '쪼맹이비', 1550, '기상술사', '5' union all
  select '아만', '하공기', 1600, '기공사', '5' union all
  select '아만', '하슬링이', 1602.5, '건슬링어', '5' union all
  select '아만', '신성한넬라굿', 1475, '홀리나이트', '5' union all
  select '아만', '모아일체', 1460, '데빌헌터', '5' union all
  select '아만', '하맛바', 1556.67, '바드', '5' union all
  select '아만', '코롤로로로', 1430, '스카우터', '5' union all
  select '아만', '도박노노', 1625.83, '아르카나', '5' union all
  select '아만', '하맛탱이', 1581.67, '창술사', '5' union all
  select '니나브', '하슈슉', 1415, '데모닉', '5' union all

  select '카단', '양국희', 1415, '소울이터', '6' union all
  select '카단', '전생했더니오크였습니다', 1553.33, '버서커', '6' union all
  select '카단', '온종일너만생각해', 1581.67, '바드', '6' union all
  select '카단', '일월광', 1626.67, '스트라이커', '6' union all
  select '카단', '밴쿠버', 1610.83, '건슬링어', '6' union all
  select '카단', '말랑쫀득딸기모찌', 1601.67, '도화가', '6' union all

  select '루페온', '홀나하림', 1415, '홀리나이트', '7' union all
  select '루페온', '오늘은비내일은맑음', 1540, '기상술사', '7' union all
  select '루페온', '꼬맹이하림', 1541.67, '도화가', '7' union all
  select '루페온', '림하l', 1590.83, '창술사', '7' union all
  select '루페온', '하림l', 1450, '배틀마스터', '7' union all
  select '루페온', 'l하림', 1620, '바드', '7' union all
  select '루페온', '샤펜a', 1462.5, '리퍼', '7' union all
  select '루페온', 'l하림l', 1625.83, '블레이드', '7' union all

  select '카제로스', '루미웅', 1415, '소울이터', '8' union all
  select '카제로스', '슬웅잉', 1598.33, '슬레이어', '8' union all
  select '카제로스', '로루로루', 1520, '소서리스', '8' union all
  select '카제로스', '루이빔', 1540, '스카우터', '8' union all
  select '카제로스', '랑이웅', 1620.83, '건슬링어', '8' union all
  select '카제로스', '루이웅', 1600.83, '인파이터', '8' union all
  select '카제로스', '랑이운', 1560, '바드', '8' union all

  select '아만', '한손에총든남', 1601.67, '데빌헌터', '9' union all
  select '아만', '양국주', 1583.33, '슬레이어', '9' union all
  select '아만', '서눅상술사', 1526.67, '기상술사', '9' union all
  select '아만', '서눅서리스', 1540, '소서리스', '9' union all
  select '아만', '하든남', 1540, '바드', '9' union all
  select '아만', '전그냥망치를든남자일뿐', 1560, '디스트로이어', '9' union all
  select '아만', '정서누기', 1551.67, '인파이터', '9' union all

  select '카단', '만개모닉', 1415, '데모닉', '10' union all
  select '카단', '미애요옹', 1540, '스트라이커', '10' union all
  select '카단', '제카드와보석을봐주세요', 1541.67, '리퍼', '10' union all
  select '카단', '도개떡', 1477.5, '도화가', '10' union all
  select '카단', '만개로드', 1540, '워로드', '10' union all
  select '카단', '만개건슬', 1540, '건슬링어', '10' union all
  select '카단', '만개하리', 1609.17, '리퍼', '10'
)
INSERT INTO
  public.characters (
    id,
    server,
    name,
    class,
    level,
    user_id
  ) (
    select
      name || '.' || id,
      server,
      name,
      class,
      level,
      id
    from
      public.profiles
    left join temp_characters
      on n = substring(nickname, 5)
  );

UPDATE
  public.profiles as p
SET
  main_character_name = (select name from public.characters where user_id = p.id order by level desc limit 1);