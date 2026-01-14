-- ==========================================
-- 1. CLEANUP & SCHEMA DEFINITION
-- ==========================================

-- Xóa bảng cũ nếu tồn tại (theo thứ tự khóa ngoại)
DROP TABLE IF EXISTS drinks CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS love_sentences CASCADE;

-- Bảng 1: love_sentences (Giữ nguyên từ file 2old.sql)
CREATE TABLE IF NOT EXISTS love_sentences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sentence TEXT NOT NULL,
  is_loving_caring BOOLEAN NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sentence ON love_sentences(sentence);

-- Bảng 2: brands
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- Bảng 3: categories (Mới - Tách ra theo yêu cầu)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  CONSTRAINT uq_brand_category UNIQUE (brand_id, name)
);

-- Bảng 4: drinks (Cập nhật - Link tới category thay vì brand + text)
CREATE TABLE IF NOT EXISTS drinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC CHECK (price >= 0),
  image_url TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  CONSTRAINT uq_category_drink UNIQUE (category_id, name)
);

-- ==========================================
-- 2. DATA IMPORT: HỒNG TRÀ NGÔ GIA (Từ 1old.sql)
-- ==========================================
DO $$
DECLARE
    v_brand_id UUID;
    v_cat_id UUID;
BEGIN
    -- Tạo Brand
    INSERT INTO brands (name) VALUES ('Hồng trà Ngô Gia')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_brand_id;

    -- Category: Thuần trà
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Thuần trà') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà Ô Long Bạch Đào', 19000, 'https://wujiateavn.com/files/product/tra-o-long-bach-dao-akhvdobi.png'),
    (v_cat_id, 'Hồng trà bí đao', 19000, 'https://wujiateavn.com/files/product/hong-tra-bi-dao-sccrscoa.jpg'),
    (v_cat_id, 'Trà Xanh Bí Đao', 19000, 'https://wujiateavn.com/files/product/tra-xanh-bi-dao-t9gm7g3c.jpg'),
    (v_cat_id, 'Trà Xanh Hoa Nhài', 19000, 'https://wujiateavn.com/files/product/tra-xanh-hoa-nhai-f2vkxmvu.jpg'),
    (v_cat_id, 'Hồng Trà Vải Thiều', 19000, 'https://wujiateavn.com/files/product/hong-tra-vai-thieu-2isu3y9o.jpg'),
    (v_cat_id, 'Trà Bí Đao Ngô Gia', 19000, 'https://wujiateavn.com/files/product/tra-bi-dao-ngo-gia-q38efry9.jpg'),
    (v_cat_id, 'Hồng Trà Đài Loan', 16000, 'https://wujiateavn.com/files/product/hong-tra-dai-loan-zvyjy3xt.jpg');

    -- Category: Trà sữa
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Trà sữa') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà Sữa Uyên Ương', 21000, 'https://wujiateavn.com/files/product/tra-sua-uyen-uong-cwcuqu7e.png'),
    (v_cat_id, 'Trà Sữa Ô Long', 24000, 'https://wujiateavn.com/files/product/tra-sua-o-long-xhhihels.png'),
    (v_cat_id, 'Trà sữa socola', 28000, 'https://wujiateavn.com/files/product/tra-sua-socola-kryfxhvq.png'),
    (v_cat_id, 'Trà Sữa Trân Châu Đường Đen', 26000, 'https://wujiateavn.com/files/product/tra-sua-tran-chau-duong-den-8ke6swxe.jpg'),
    (v_cat_id, 'Trà Xanh Sữa', 24000, 'https://wujiateavn.com/files/product/tra-xanh-sua-efbubhnb.jpg'),
    (v_cat_id, 'Trà Sữa Vải Thiều', 24000, 'https://wujiateavn.com/files/product/tra-sua-vai-thieu-mcpbo5wd.jpg'),
    (v_cat_id, 'Trà Sữa Bí Đao', 24000, 'https://wujiateavn.com/files/product/tra-sua-bi-dao-qxo9y6dn.jpg'),
    (v_cat_id, 'Trà Sữa Đài Loan', 21000, 'https://wujiateavn.com/files/product/tra-sua-dai-loan-qlgi7h4z.jpg');

    -- Category: Trà latte
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Trà latte') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Sữa Tươi Khoai Môn Nghiền', 41000, 'https://wujiateavn.com/files/product/sua-tuoi-khoai-mon-nghien-3ibpgbff.png'),
    (v_cat_id, 'Ô Long Latte', 31000, 'https://wujiateavn.com/files/product/o-long-latte-xibmdaoa.png'),
    (v_cat_id, 'Sữa Tươi Trân Châu Đường Đen ', 44000, 'https://wujiateavn.com/files/product/sua-tuoi-tran-chau-duong-den-d2mz99ew.png'),
    (v_cat_id, 'Trân châu đường đen latte', 33000, 'https://wujiateavn.com/files/product/sua-tuoi-tran-chau-duong-den-5stas08q.jpg'),
    (v_cat_id, 'Trà Xanh Latte', 31000, 'https://wujiateavn.com/files/product/tra-xanh-latte-lbm6ltnr.jpg'),
    (v_cat_id, 'Hồng Trà Latte Vải Thiều', 31000, 'https://wujiateavn.com/files/product/hong-tra-latte-vai-thieu-w3lcixhg.jpg'),
    (v_cat_id, 'Bí Đao Latte', 31000, 'https://wujiateavn.com/files/product/bi-dao-latte-dmzbutlw.jpg'),
    (v_cat_id, 'Hồng Trà latte Đài Loan', 28000, 'https://wujiateavn.com/files/product/hong-tra-latte-dai-loan-kvmyjjtc.jpg');

    -- Category: Trà trái cây
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Trà trái cây') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Ô Long Nho', 30000, 'https://wujiateavn.com/files/product/o-long-nho-st0xvjet.png'),
    (v_cat_id, 'Trà Ô Long Đào', 29000, 'https://wujiateavn.com/files/product/tra-o-long-dao-qbpryj3f.png'),
    (v_cat_id, 'Màu Hồng Lãng Mạn', 29000, 'https://wujiateavn.com/files/product/mau-hong-lang-man-ynqbujnz.png'),
    (v_cat_id, 'Trà Xanh Đào Ngô Gia', 29000, 'https://wujiateavn.com/files/product/tra-xanh-dao-ngo-gia-gybsj8ga.png'),
    (v_cat_id, 'Hồng Trà Đào Ngô Gia', 29000, 'https://wujiateavn.com/files/product/hong-tra-dao-ngo-gia-oown3ciw.png'),
    (v_cat_id, 'Trà Xanh Chanh', 24000, 'https://wujiateavn.com/files/product/tra-xanh-chanh-tolzbxkm.jpg'),
    (v_cat_id, 'Hồng Trà Chanh Vải Thiều', 24000, 'https://wujiateavn.com/files/product/hong-tra-chanh-vai-thieu-zlk6nqui.jpg'),
    (v_cat_id, 'Bí Đao Chanh', 24000, 'https://wujiateavn.com/files/product/tra-bi-dao-chanh-iioyjqd0.jpg'),
    (v_cat_id, 'Hồng Trà Chanh Đài Loan', 21000, 'https://wujiateavn.com/files/product/hong-tra-chanh-dai-loan-gn8vd5fl.png');

    -- Category: Thức Uống "Hot"
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Thức Uống "Hot"') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Hồng Trà Trứng Khủng Long', 26000, 'https://wujiateavn.com/files/product/hong-tra-trung-khung-long-mp4kvvud.png'),
    (v_cat_id, 'Trà Sữa Long Châu', 29000, 'https://wujiateavn.com/files/product/tra-sua-long-chau-s04uejea.png'),
    (v_cat_id, 'Ô Long Ô Mai Chanh Dây', 27000, 'https://wujiateavn.com/files/product/o-long-o-mai-chanh-day-n18ybfft.png'),
    (v_cat_id, 'Trà Xanh Ô Mai Chanh Dây', 27000, 'https://wujiateavn.com/files/product/tra-xanh-o-mai-chanh-day-uvczfiaw.png'),
    (v_cat_id, 'Trà Sữa Ô Long Khoai Môn Nghiền', 33000, 'https://wujiateavn.com/files/product/tra-sua-o-long-khoai-mon-nghien-khyl84yb.png'),
    (v_cat_id, 'Trà Sữa Khoai Môn Nghiền', 30000, 'https://wujiateavn.com/files/product/tra-sua-khoai-mon-nghien-q1qeexkd.png'),
    (v_cat_id, 'Trà Ô Long Bí Đao', 22000, 'https://wujiateavn.com/files/product/tra-o-long-bi-dao-qyfxl4ee.png'),
    (v_cat_id, 'Bát Bảo Ngô Gia (Ngọt)', 28000, 'https://wujiateavn.com/files/product/bat-bao-ngo-gia-ngot-ozomolpg.png'),
    (v_cat_id, 'Hồng Trà Kem Tươi', 23000, 'https://wujiateavn.com/files/product/hong-tra-kem-tuoi-44n8f9am.png');

    -- Category: Thức Uống Mới
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Thức Uống Mới') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Ô Long Kem Cheese', 26000, 'https://wujiateavn.com/files/product/o-long-kem-cheese-wlmfb7sr.png'),
    (v_cat_id, 'Trà Xanh Kem Cheese', 26000, 'https://wujiateavn.com/files/product/tra-xanh-kem-cheese-hrkfrdsv.png'),
    (v_cat_id, 'Hồng Trà Kem Cheese', 23000, 'https://wujiateavn.com/files/product/hong-tra-kem-cheese-pmj1l1ce.png'),
    (v_cat_id, 'Trà Xí Muội Ô Long', 23000, 'https://wujiateavn.com/files/product/tra-xi-muoi-o-long-2azq859w.png'),
    (v_cat_id, 'Trà Xí Muội Bí Đao', 23000, 'https://wujiateavn.com/files/product/tra-xi-muoi-bi-dao-pvasxw4r.png'),
    (v_cat_id, 'Trà Xí Muội Ngô Gia', 20000, 'https://wujiateavn.com/files/product/tra-xi-muoi-ngo-gia-ruyblr3c.png');
END $$;

-- ==========================================
-- 3. DATA IMPORT: CHEESE COFFEE (Từ 3old.sql)
-- ==========================================
DO $$
DECLARE
    v_brand_id UUID;
    v_cat_id UUID;
BEGIN
    -- Tạo Brand
    INSERT INTO brands (name) VALUES ('Cheese Coffee')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_brand_id;

    -- Category: Trà sữa nguyên lá
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Trà sữa nguyên lá') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà Sữa Nguyên Lá - Full Leaf Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya7vypkhm7559'),
    (v_cat_id, 'Trà Sữa Lài - Jasmine Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn48rj1t6r99'),
    (v_cat_id, 'Trà Sữa Lài Hạnh Nhân - Jasmine Almond Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn24aiygrb24'),
    (v_cat_id, 'Trà Sữa Nguyên Lá Đặc Biệt - Full Leaf Par''Tea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m11lq8ansahn65'),
    (v_cat_id, 'Trà Sữa Ô Long Gạo Rang - Genmaicha Oolong Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rm38jjdj22d0'),
    (v_cat_id, 'Trà Sữa Ô Long Nguyên Lá - Full Leaf Oolong Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rm3oig081m8a'),
    (v_cat_id, 'Trà Sữa Lài Đặc Biệt - Jasmine Par''Tea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn0spgldiw3a'),
    (v_cat_id, 'Trà Sữa Ô Long Hoa Lài - Jasmine Oolong Milk Tea', 45000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m22chuqvxcdac3'),
    (v_cat_id, 'Dịu Đào - Peach & Peace Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-manlsv4ehw48bc'),
    (v_cat_id, 'Trà Sữa Nhãn Khúc Bạch - Longan Panna Cotta Milktea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcvvgdp88om47d'),
    (v_cat_id, 'Trà sữa Đậu Xanh - Mung Bean Milktea', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mg61hgu83k0ab1');

    -- Category: Topping
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Topping') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trân châu Matcha Phô Mai - Cheese Matcha Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qq3g9s6wmp62'),
    (v_cat_id, 'Hạt nổ củ năng - Pink Popping Boba', 10000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdc9um1xyw1c'),
    (v_cat_id, 'Trân Châu Đen - Black Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1hux7h2xy9ra0'),
    (v_cat_id, 'Trân Châu Trắng - White Bubble', 10000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huxyz2menzde'),
    (v_cat_id, 'Trân châu Củ năng dẻo - Pink Bubble', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdbw7i0mk82f'),
    (v_cat_id, 'Khúc Bạch - Panna Cotta', 15000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huyu4b1lxvb6'),
    (v_cat_id, 'Bánh Flan - Flan', 19000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huydy6qvun2d'),
    (v_cat_id, 'Kem Phô Mai - Fomai Macchiato', 19000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m1huzt2vvtxvc5');

    -- Category: Trà & Matcha
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Trà & Matcha') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà Xanh Latte - Matcha Latte', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0wzykirxctre0'),
    (v_cat_id, 'Trà Xanh Nhật Bản Đặc Biệt - Matcha Par''Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0wzz0agulgt8e'),
    (v_cat_id, 'Dịu Trà - Gentle Matcha Latte', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qpzoar652rac'),
    (v_cat_id, 'Trà Nhãn Khúc Bạch - Panna Cotta Longan Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5cn1h46vg1v03'),
    (v_cat_id, 'Trà Lài Vải - Lychee Jasmine Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9lwo37psd14'),
    (v_cat_id, 'Trà Siêu Đào - Perfect Peach Tea', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9kznfj68d53'),
    (v_cat_id, 'Trà Cam Quýt - Gold On Top', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mculqx63qblrcb'),
    (v_cat_id, 'Trà Đào Hồng - Pinky Peach Tea', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-manltcvyqeoo8c');

    -- Category: Dòng Bơ
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Dòng Bơ') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà Sữa Bơ - Avocado Milk Tea', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzg2p2s6xljh1f'),
    (v_cat_id, 'Bơ Cacao Kem Muối - Salted Cacao Avocado', 55000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9qejobr8hf5'),
    (v_cat_id, 'Avocado 100% With Almond - Bơ 100% Vị Hạnh Nhân', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2c6q2xvm3zo18'),
    (v_cat_id, 'Genmaicha Avocado Milk Tea - Trà Sữa Bơ Gạo Rang', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzaibxysnlwh3b'),
    (v_cat_id, 'Genmaicha Avocado Bubble Milk Tea - Trà Sữa Bơ Gạo Rang Trân Châu Đen', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2c6qkd842b6f4'),
    (v_cat_id, 'Bơ Bơ Đậu Đậu - Avocado Mung Bean', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mct5p0jw69uk5c'),
    (v_cat_id, '[Trùm Deal] Trà Sữa Bơ - Avocado Milk Tea (M)', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-ma16ki4txvnmb9');

    -- Category: Cà Phê
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Cà Phê') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Marble Bạc Xỉu - Marble Caffè', 52000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m2rlyb8qvdmi35'),
    (v_cat_id, 'Cà Phê Kem Muối - Salted Marble Caffè', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzg2oie17f4da0'),
    (v_cat_id, 'Opera Bạc Xỉu - Opera Caffè', 62000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m5thje14r260e6'),
    (v_cat_id, 'Cà Phê Sữa - Milk Caffè', 42000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lya9ywgsndqlbc'),
    (v_cat_id, 'Cà Phê Đen - Black Caffè', 48000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lz7ep5taop0hc8'),
    (v_cat_id, 'Phin Nâu - Brown Phin', 49000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81o4td01e379'),
    (v_cat_id, 'Cà Phê Đen Kiểu Mỹ - Iced Americano', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lz7egxmc4n8h7d'),
    (v_cat_id, 'Phin Đặc Biệt - Phin Supreme', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81oyju2mfe8e'),
    (v_cat_id, 'Americano Đào - Peach Americano', 69000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mculi614xq588c'),
    (v_cat_id, 'Phin Đen - Black Phin', 35000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mf81myr0o16z2e');

    -- Category: Bánh
    INSERT INTO categories (brand_id, name) VALUES (v_brand_id, 'Bánh') RETURNING id INTO v_cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Tiramisu Mini Phô Mai - Tiramisu Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m3mcmhanewmg32'),
    (v_cat_id, 'Bơ Mini Phô Mai Avocado Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m3mclyueexth4f'),
    (v_cat_id, 'Mini 4 loại Phô Mai - Mini 4 Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m8dhi3ib6w76bf'),
    (v_cat_id, 'Đào Mini Phô Mai - Peach Mini Cheese', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdf4rlg5eg0a'),
    (v_cat_id, 'Bánh Mì Que - Breadstick', 29000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mgn8r7kribylfa'),
    (v_cat_id, 'BÁNH NGÀN LỚP PHÔ MAI THỊT NGUỘI - HAM & CHEESE CROISSANT', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1aw5usp8cce'),
    (v_cat_id, 'BÁNH NGÀN LỚP 4 LOẠI PHÔ MAI - CROISSANT 4 CHEESE', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1a2spxcv743'),
    (v_cat_id, 'BÁNH NGÀN LỚP TIRAMISU - CROISSANT TIRAMISU', 89000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-mcd1agl3lc9vf2'),
    (v_cat_id, 'Bánh Cua Ngàn Lớp - Butter Croissant', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mipkfn8va3nl58'),
    (v_cat_id, 'Chiffon Tiramisu', 59000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m0txw2pqn75942'),
    (v_cat_id, 'Crepe Trân Châu - Bubble Crepe', 65000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lyaa5trdu5ot08'),
    (v_cat_id, 'Tiramisu Tan Chảy - Super Tiramisu Cake', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzejjml1p00d5b'),
    (v_cat_id, 'Super Bơ - Super Avocado Cake', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ras8-m11lqwu3vgrj35'),
    (v_cat_id, 'Crepe Bơ - Avocado Crepe', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7r98o-lzaii5rt557l25'),
    (v_cat_id, 'Super 4 Cheese - Super 4 Cheese Cake', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m8dhiwp2fsef39'),
    (v_cat_id, 'Crepe Matcha - Matcha Crepe', 75000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m7qq6sa6lxgx9b'),
    (v_cat_id, 'Super Đào - Super Peach Cake', 85000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-7ra0g-m6vdgfiz0qbc88'),
    (v_cat_id, 'Super Mint Tiramisu - Tiramisu Bạc Hà Tan Chảy', 79000, 'https://down-zl-vn.img.susercontent.com/vn-11134517-820l4-mi2dxi2lmpkwa0');
END $$;