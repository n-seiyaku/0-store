DO $$
DECLARE
    brand_id UUID;
    cat_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Cheese Coffee') RETURNING id INTO brand_id;

    -- Category: Trà sữa nguyên lá
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Trà sữa nguyên lá') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà Sữa Nguyên Lá - Full Leaf Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya7vypkhm7559'),
    (cat_id, 'Trà Sữa Lài - Jasmine Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn48rj1t6r99'),
    (cat_id, 'Trà Sữa Lài Hạnh Almond Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn24aiygrb24'),
    (cat_id, 'Trà Sữa Nguyên Lá Đặc Biệt - Full Leaf Par''Tea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m11lq8ansahn65'),
    (cat_id, 'Trà Sữa Ô Long Gạo Rang - Genmaicha Oolong Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rm38jjdj22d0'),
    (cat_id, 'Trà Sữa Ô Long Nguyên Lá - Full Leaf Oolong Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rm3oig081m8a'),
    (cat_id, 'Trà Sữa Lài Đặc Biệt - Jasmine Par''Tea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn0spgldiw3a'),
    (cat_id, 'Trà Sữa Ô Long Hoa Lài - Jasmine Oolong Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m22chuqvxcdac3'),
    (cat_id, 'Dịu Đào - Peach & Peace Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-manlsv4ehw48bc'),
    (cat_id, 'Trà Sữa Nhãn Khúc Bạch - Longan Panna Cotta Milktea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcvvgdp88om47d'),
    (cat_id, 'Trà sữa Đậu Xanh - Mung Bean Milktea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mg61hgu83k0ab1');

    -- Category: Topping
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Topping') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trân châu Matcha Phô Mai - Cheese Matcha Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qq3g9s6wmp62'),
    (cat_id, 'Hạt nổ củ năng - Pink Popping Boba', 10000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdc9um1xyw1c'),
    (cat_id, 'Trân Châu Đen - Black Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1hux7h2xy9ra0'),
    (cat_id, 'Trân Châu Trắng - White Bubble', 10000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huxyz2menzde'),
    (cat_id, 'Trân châu Củ năng dẻo - Pink Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdbw7i0mk82f'),
    (cat_id, 'Khúc Bạch - Panna Cotta', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huyu4b1lxvb6'),
    (cat_id, 'Bánh Flan - Flan', 19000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huydy6qvun2d'),
    (cat_id, 'Kem Phô Mai - Fomai Macchiato', 19000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huzt2vvtxvc5');

    -- Category: Trà & Matcha
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Trà & Matcha') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà Xanh Latte - Matcha Latte', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0wzykirxctre0'),
    (cat_id, 'Trà Xanh Nhật Bản Đặc Biệt - Matcha Par''Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0wzz0agulgt8e'),
    (cat_id, 'Dịu Trà - Gentle Matcha Latte', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qpzoar652rac'),
    (cat_id, 'Trà Nhãn Khúc Bạch - Panna Cotta Longan Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn1h46vg1v03'),
    (cat_id, 'Trà Lài Vải - Lychee Jasmine Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9lwo37psd14'),
    (cat_id, 'Trà Siêu Đào - Perfect Peach Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9kznfj68d53'),
    (cat_id, 'Trà Cam Quýt - Gold On Top', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mculqx63qblrcb'),
    (cat_id, 'Trà Đào Hồng - Pinky Peach Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-manltcvyqeoo8c');

    -- Category: Dòng Bơ
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Dòng Bơ') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà Sữa Bơ - Avocado Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzg2p2s6xljh1f'),
    (cat_id, 'Bơ Cacao Kem Muối - Salted Cacao Avocado', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9qejobr8hf5'),
    (cat_id, 'Avocado 100% With Almond - Bơ 100% Vị Hạnh Nhân', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2c6q2xvm3zo18'),
    (cat_id, 'Genmaicha Avocado Milk Tea - Trà Sữa Bơ Gạo Rang', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzaibxysnlwh3b'),
    (cat_id, 'Genmaicha Avocado Bubble Milk Tea - Trà Sữa Bơ Gạo Rang Trân Châu Đen', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2c6qkd842b6f4'),
    (cat_id, 'Bơ Bơ Đậu Đậu - Avocado Mung Bean', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mct5p0jw69uk5c'),
    (cat_id, '[Trùm Deal] Trà Sữa Bơ - Avocado Milk Tea (M)', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-ma16ki4txvnmb9');

    -- Category: Cà Phê
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Cà Phê') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Marble Bạc Xỉu - Marble Caffè', 52000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rlyb8qvdmi35'),
    (cat_id, 'Cà Phê Kem Muối - Salted Marble Caffè', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzg2oie17f4da0'),
    (cat_id, 'Opera Bạc Xỉu - Opera Caffè', 62000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5thje14r260e6'),
    (cat_id, 'Cà Phê Sữa - Milk Caffè', 42000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9ywgsndqlbc'),
    (cat_id, 'Cà Phê Đen - Black Caffè', 48000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lz7ep5taop0hc8'),
    (cat_id, 'Phin Nâu - Brown Phin', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81o4td01e379'),
    (cat_id, 'Cà Phê Đen Kiểu Mỹ - Iced Americano', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lz7egxmc4n8h7d'),
    (cat_id, 'Phin Đặc Biệt - Phin Supreme', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81oyju2mfe8e'),
    (cat_id, 'Americano Đào - Peach Americano', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mculi614xq588c'),
    (cat_id, 'Phin Đen - Black Phin', 35000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81myr0o16z2e');

    -- Category: Bánh
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Bánh') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Tiramisu Mini Phô Mai - Tiramisu Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m3mcmhanewmg32'),
    (cat_id, 'Bơ Mini Phô Mai Avocado Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m3mclyueexth4f'),
    (cat_id, 'Mini 4 loại Phô Mai - Mini 4 Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m8dhi3ib6w76bf'),
    (cat_id, 'Đào Mini Phô Mai - Peach Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdf4rlg5eg0a'),
    (cat_id, 'Bánh Mì Que - Breadstick', 29000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mgn8r7kribylfa'),
    (cat_id, 'BÁNH NGÀN LỚP PHÔ MAI THỊT NGUỘI - HAM & CHEESE CROISSANT', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1aw5usp8cce'),
    (cat_id, 'BÁNH NGÀN LỚP 4 LOẠI PHÔ MAI - CROISSANT 4 CHEESE', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1a2spxcv743'),
    (cat_id, 'BÁNH NGÀN LỚP TIRAMISU - CROISSANT TIRAMISU', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1agl3lc9vf2'),
    (cat_id, 'Bánh Cua Ngàn Lớp - Butter Croissant', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mipkfn8va3nl58'),
    (cat_id, 'Chiffon Tiramisu', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0txw2pqn75942'),
    (cat_id, 'Crepe Trân Châu - Bubble Crepe', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lyaa5trdu5ot08'),
    (cat_id, 'Tiramisu Tan Chảy - Super Tiramisu Cake', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzejjml1p00d5b'),
    (cat_id, 'Super Bơ - Super Avocado Cake', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m11lqwu3vgrj35'),
    (cat_id, 'Crepe Bơ - Avocado Crepe', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzaii5rt557l25'),
    (cat_id, 'Super 4 Cheese - Super 4 Cheese Cake', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m8dhiwp2fsef39'),
    (cat_id, 'Crepe Matcha - Matcha Crepe', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qq6sa6lxgx9b'),
    (cat_id, 'Super Đào - Super Peach Cake', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdgfiz0qbc88'),
    (cat_id, 'Super Mint Tiramisu - Tiramisu Bạc Hà Tan Chảy', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mi2dxi2lmpkwa0');
END $$;