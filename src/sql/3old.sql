-- ==========================================
-- 1) BRAND: CHEESE COFFEE
-- ==========================================
INSERT INTO brands (name)
VALUES ('Cheese Coffee')
ON CONFLICT DO NOTHING;

-- ==========================================
-- 2) DRINKS: PHÂN THEO CATEGORY
-- ==========================================

-- TRÀ SỮA NGUYÊN LÁ
WITH b AS (SELECT id FROM brands WHERE name = 'Cheese Coffee' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Trà sữa nguyên lá', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
    ('Trà Sữa Nguyên Lá - Full Leaf Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya7vypkhm7559'),
    ('Trà Sữa Lài - Jasmine Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn48rj1t6r99'),
    ('Trà Sữa Lài Hạnh Nhân - Jasmine Almond Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn24aiygrb24'),
    ('Trà Sữa Nguyên Lá Đặc Biệt - Full Leaf Par''Tea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m11lq8ansahn65'),
    ('Trà Sữa Ô Long Gạo Rang - Genmaicha Oolong Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rm38jjdj22d0'),
    ('Trà Sữa Ô Long Nguyên Lá - Full Leaf Oolong Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rm3oig081m8a'),
    ('Trà Sữa Lài Đặc Biệt - Jasmine Par''Tea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn0spgldiw3a'),
    ('Trà Sữa Ô Long Hoa Lài - Jasmine Oolong Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m22chuqvxcdac3'),
    ('Dịu Đào - Peach & Peace Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-manlsv4ehw48bc'),
    ('Trà Sữa Nhãn Khúc Bạch - Longan Panna Cotta Milktea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcvvgdp88om47d'),
    ('Trà sữa Đậu Xanh - Mung Bean Milktea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mg61hgu83k0ab1')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- TOPPING
WITH b AS (SELECT id FROM brands WHERE name = 'Cheese Coffee' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Topping', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
    ('Trân châu Matcha Phô Mai - Cheese Matcha Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qq3g9s6wmp62'),
    ('Hạt nổ củ năng - Pink Popping Boba', 10000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdc9um1xyw1c'),
    ('Trân Châu Đen - Black Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1hux7h2xy9ra0'),
    ('Trân Châu Trắng - White Bubble', 10000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huxyz2menzde'),
    ('Trân châu Củ năng dẻo - Pink Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdbw7i0mk82f'),
    ('Khúc Bạch - Panna Cotta', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huyu4b1lxvb6'),
    ('Bánh Flan - Flan', 19000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huydy6qvun2d'),
    ('Kem Phô Mai - Fomai Macchiato', 19000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huzt2vvtxvc5')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- MATCHA & TRÀ TRÁI CÂY
WITH b AS (SELECT id FROM brands WHERE name = 'Cheese Coffee' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Trà & Matcha', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
    ('Trà Xanh Latte - Matcha Latte', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0wzykirxctre0'),
    ('Trà Xanh Nhật Bản Đặc Biệt - Matcha Par''Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0wzz0agulgt8e'),
    ('Dịu Trà - Gentle Matcha Latte', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qpzoar652rac'),
    ('Trà Nhãn Khúc Bạch - Panna Cotta Longan Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn1h46vg1v03'),
    ('Trà Lài Vải - Lychee Jasmine Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9lwo37psd14'),
    ('Trà Siêu Đào - Perfect Peach Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9kznfj68d53'),
    ('Trà Cam Quýt - Gold On Top', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mculqx63qblrcb'),
    ('Trà Đào Hồng - Pinky Peach Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-manltcvyqeoo8c')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- DÒNG BƠ (AVOCADO)
WITH b AS (SELECT id FROM brands WHERE name = 'Cheese Coffee' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Dòng Bơ', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
    ('Trà Sữa Bơ - Avocado Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzg2p2s6xljh1f'),
    ('Bơ Cacao Kem Muối - Salted Cacao Avocado', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9qejobr8hf5'),
    ('Avocado 100% With Almond - Bơ 100% Vị Hạnh Nhân', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2c6q2xvm3zo18'),
    ('Genmaicha Avocado Milk Tea - Trà Sữa Bơ Gạo Rang', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzaibxysnlwh3b'),
    ('Genmaicha Avocado Bubble Milk Tea - Trà Sữa Bơ Gạo Rang Trân Châu Đen', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2c6qkd842b6f4'),
    ('Bơ Bơ Đậu Đậu - Avocado Mung Bean', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mct5p0jw69uk5c'),
    ('[Trùm Deal] Trà Sữa Bơ - Avocado Milk Tea (M)', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-ma16ki4txvnmb9')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- CÀ PHÊ & BẠC XỈU
WITH b AS (SELECT id FROM brands WHERE name = 'Cheese Coffee' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Cà Phê', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
    ('Marble Bạc Xỉu - Marble Caffè', 52000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rlyb8qvdmi35'),
    ('Cà Phê Kem Muối - Salted Marble Caffè', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzg2oie17f4da0'),
    ('Opera Bạc Xỉu - Opera Caffè', 62000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5thje14r260e6'),
    ('Cà Phê Sữa - Milk Caffè', 42000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9ywgsndqlbc'),
    ('Cà Phê Đen - Black Caffè', 48000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lz7ep5taop0hc8'),
    ('Phin Nâu - Brown Phin', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81o4td01e379'),
    ('Cà Phê Đen Kiểu Mỹ - Iced Americano', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lz7egxmc4n8h7d'),
    ('Phin Đặc Biệt - Phin Supreme', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81oyju2mfe8e'),
    ('Americano Đào - Peach Americano', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mculi614xq588c'),
    ('Phin Đen - Black Phin', 35000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81myr0o16z2e')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- BÁNH & MINI CHEESE
WITH b AS (SELECT id FROM brands WHERE name = 'Cheese Coffee' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Bánh', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
    ('Tiramisu Mini Phô Mai - Tiramisu Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m3mcmhanewmg32'),
    ('Bơ Mini Phô Mai Avocado Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m3mclyueexth4f'),
    ('Mini 4 loại Phô Mai - Mini 4 Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m8dhi3ib6w76bf'),
    ('Đào Mini Phô Mai - Peach Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdf4rlg5eg0a'),
    ('Bánh Mì Que - Breadstick', 29000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mgn8r7kribylfa'),
    ('BÁNH NGÀN LỚP PHÔ MAI THỊT NGUỘI - HAM & CHEESE CROISSANT', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1aw5usp8cce'),
    ('BÁNH NGÀN LỚP 4 LOẠI PHÔ MAI - CROISSANT 4 CHEESE', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1a2spxcv743'),
    ('BÁNH NGÀN LỚP TIRAMISU - CROISSANT TIRAMISU', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1agl3lc9vf2'),
    ('Bánh Cua Ngàn Lớp - Butter Croissant', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mipkfn8va3nl58'),
    ('Chiffon Tiramisu', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0txw2pqn75942'),
    ('Crepe Trân Châu - Bubble Crepe', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lyaa5trdu5ot08'),
    ('Tiramisu Tan Chảy - Super Tiramisu Cake', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzejjml1p00d5b'),
    ('Super Bơ - Super Avocado Cake', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m11lqwu3vgrj35'),
    ('Crepe Bơ - Avocado Crepe', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzaii5rt557l25'),
    ('Super 4 Cheese - Super 4 Cheese Cake', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m8dhiwp2fsef39'),
    ('Crepe Matcha - Matcha Crepe', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qq6sa6lxgx9b'),
    ('Super Đào - Super Peach Cake', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdgfiz0qbc88'),
    ('Super Mint Tiramisu - Tiramisu Bạc Hà Tan Chảy', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mi2dxi2lmpkwa0')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- ==========================================
-- 3) THỐNG KÊ LẠI
-- ==========================================
SELECT category, COUNT(*) AS total
FROM drinks
WHERE brand_id = (SELECT id FROM brands WHERE name = 'Cheese Coffee')
GROUP BY category
ORDER BY total DESC;