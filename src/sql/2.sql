-- Hồng trà Ngô Gia
DO $$
DECLARE
    brand_id UUID;
    cat_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Hồng trà Ngô Gia')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO brand_id;

    -- Category: Thuần trà
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Thuần trà')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà Ô Long Bạch Đào', 19000, 'https://wujiateavn.com/files/product/tra-o-long-bach-dao-akhvdobi.png'),
    (cat_id, 'Hồng trà bí đao', 19000, 'https://wujiateavn.com/files/product/hong-tra-bi-dao-sccrscoa.jpg'),
    (cat_id, 'Trà Xanh Bí Đao', 19000, 'https://wujiateavn.com/files/product/tra-xanh-bi-dao-t9gm7g3c.jpg'),
    (cat_id, 'Trà Xanh Ngô Gia', 17000, 'https://wujiateavn.com/files/product/tra-xanh-ngo-gia-h0vbt37r.png'),
    (cat_id, 'Trà Ô Long Ngô Gia', 19000, 'https://wujiateavn.com/files/product/tra-o-long-ngo-gia-wwhjajis.png'),
    (cat_id, 'Hồng trà Ngô Gia', 17000, 'https://wujiateavn.com/files/product/hong-tra-ngo-gia-2n980uup.png');

    -- Category: Trà sữa
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Trà sữa') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà sữa Ngô Gia', 25000, 'https://wujiateavn.com/files/product/tra-sua-ngo-gia-89kueq5z.png'),
    (cat_id, 'Trà sữa trân châu Ngô Gia', 29000, 'https://wujiateavn.com/files/product/tra-sua-tran-chau-ngo-gia-jrtmew9l.png'),
    (cat_id, 'Trà sữa sương sáo', 29000, 'https://wujiateavn.com/files/product/tra-sua-suong-sao-f3uavqnd.png'),
    (cat_id, 'Trà sữa thạch dừa', 29000, 'https://wujiateavn.com/files/product/tra-sua-thach-dua-m3j5u9m8.png'),
    (cat_id, 'Trà sữa Pudding', 29000, 'https://wujiateavn.com/files/product/tra-sua-pudding-j5n2oxtz.png'),
    (cat_id, 'Trà sữa khoai môn nghiền', 30000, 'https://wujiateavn.com/files/product/tra-sua-khoai-mon-nghien-q1qeexkd.png'),
    (cat_id, 'Trà Ô Long Bí Đao', 22000, 'https://wujiateavn.com/files/product/tra-o-long-bi-dao-qyfxl4ee.png'),
    (cat_id, 'Bát Bảo Ngô Gia (Ngọt)', 28000, 'https://wujiateavn.com/files/product/bat-bao-ngo-gia-ngot-ozomolpg.png'),
    (cat_id, 'Hồng Trà Kem Tươi', 23000, 'https://wujiateavn.com/files/product/hong-tra-kem-tuoi-44n8f9am.png');

    -- Category: Thức Uống Mới
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Thức Uống Mới') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Ô Long Kem Cheese', 26000, 'https://wujiateavn.com/files/product/o-long-kem-cheese-wlmfb7sr.png'),
    (cat_id, 'Trà Xanh Kem Cheese', 26000, 'https://wujiateavn.com/files/product/tra-xanh-kem-cheese-96w686tq.png'),
    (cat_id, 'Hồng Trà Kem Cheese', 26000, 'https://wujiateavn.com/files/product/hong-tra-kem-cheese-atc7hlyw.png'),
    (cat_id, 'Lục Trà Sữa Kem Cheese', 31000, 'https://wujiateavn.com/files/product/luc-tra-sua-kem-cheese-uuvf36o9.png'),
    (cat_id, 'Trà Sữa Kem Cheese', 31000, 'https://wujiateavn.com/files/product/tra-sua-kem-cheese-9h5162p4.png'),
    (cat_id, 'Ô Long Sữa Kem Cheese', 33000, 'https://wujiateavn.com/files/product/o-long-sua-kem-cheese-j668045y.png');

    -- Category: Hot
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Hot') RETURNING id INTO cat_id;
    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Hồng trà chanh tươi', 23000, 'https://wujiateavn.com/files/product/hong-tra-chanh-tuoi-0n5tmsrj.png'),
    (cat_id, 'Trà xanh chanh tươi', 23000, 'https://wujiateavn.com/files/product/tra-xanh-chanh-tuoi-e8l0vpxi.png'),
    (cat_id, 'Trà xanh chanh dây', 26000, 'https://wujiateavn.com/files/product/tra-xanh-chanh-day-p725m93s.png'),
    (cat_id, 'Trà xanh yakult', 28000, 'https://wujiateavn.com/files/product/tra-xanh-yakult-1zphq30b.png');
END $$;

-- Phúc Long
DO $$
DECLARE
    brand_id UUID;
    cat_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Phúc Long')
    RETURNING id INTO brand_id;

    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Trà trái cây')
    RETURNING id INTO cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà Vải Lài', 60000, 'https://s3-hcmc02.higiocloud.vn/images/2026/03/tra-nhan-lai100-20260312050025.jpg'),
    (cat_id, 'Trà Nhãn Lài', 60000, 'https://s3-hcmc02.higiocloud.vn/images/2026/03/tra-nhan-lai100-20260312050025.jpg'),
    (cat_id, 'Trà Nhãn Sen', 60000, 'https://s3-hcmc02.higiocloud.vn/images/2026/03/tra-nhan-lai100-20260312082056.jpg');
END $$;

DO $$
DECLARE
    brand_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Phúc Long')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO brand_id;

    INSERT INTO toppings (brand_id, name, price) VALUES
        (brand_id, 'Topping vải (4 trái)', 20000),
        (brand_id, 'Topping thạch konjac', 15000),
        (brand_id, 'Topping đác thơm', 25000),
        (brand_id, 'Topping nhãn (4 trái)', 20000),
        (brand_id, 'Đào (3 miếng)', 20000),
        (brand_id, 'Topping đác cam', 25000);
END $$;

-- Koi Thé
DO $$
DECLARE
    brand_id UUID;
    cat_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Koi Thé')
    RETURNING id INTO brand_id;

    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Trà Sữa')
    RETURNING id INTO cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (cat_id, 'Trà Sữa Mật Ong Macchiato', 69000, 'https://s3-hcmc02.higiocloud.vn/images/2026/03/tra-nhan-lai100-20260312050025.jpg'),
    (cat_id, 'Trà Sữa Thân Châu Hoàng Kim', 60000, 'https://s3-hcmc02.higiocloud.vn/images/2026/03/tra-nhan-lai100-20260312050025.jpg');
END $$;

DO $$
DECLARE
    brand_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Koi Thé')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO brand_id;

    INSERT INTO toppings (brand_id, name, price) VALUES
        (brand_id, 'Trân Châu Hoàng Kim (Golden Bubble)', 7000),
        (brand_id, 'Khoai Môn Viên (Taro Q)', 20000),
        (brand_id, 'Thạch Konjac (Konjac Jelly)', 20000),
        (brand_id, 'Thạch Dừa (Coconut Jelly)', 20000),
        (brand_id, 'TGBK (Taro Q, Golden Bubble, Konjac Jelly)', 20000);
END $$;

-- Crena Tea
DO $$
DECLARE
    v_brand_id UUID;
    v_cat_id UUID;
BEGIN
    -- 1. Lấy hoặc tạo Brand Crane Tea
    INSERT INTO brands (name) 
    VALUES ('Crane Tea')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_brand_id;

    -- 2. Category: MÓN MỚI (MM)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'MÓN MỚI') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Olong Sữa Kim Châu Phô Mai', 39000, 'https://image.foodbook.vn/images/20260330/1774886331082-Olong_Kim_Chau.jpg'),
    (v_cat_id, 'Trà Me Đác Thơm', 35000, 'https://image.foodbook.vn/images/20260310/1773128501687-TRA_ME_AC_THOM.jpg'),
    (v_cat_id, 'Matcha Tàu Hủ', 35000, 'https://image.foodbook.vn/images/20260310/1773127602512-MATCHA_TAU_HU.jpg'),
    (v_cat_id, 'Trà Nhãn Thạch Quế Hoa', 35000, 'https://image.foodbook.vn/images/20260310/1773128261357-TRA_NHAN_THACH_QUE_HOA.jpg'),
    (v_cat_id, 'Trà Nho Xanh Thanh Châu', 30000, 'https://image.foodbook.vn/images/20260316/1773638009327-TRA_NHO_XANH.jpg'),
    (v_cat_id, 'Trà Xoài Chanh Dây', 30000, 'https://image.foodbook.vn/images/20260310/1773128444370-TRA_XOAI_CHANH_DAY.jpg'),
    (v_cat_id, 'Trà Gạo Rang Creamy', 25000, 'https://image.foodbook.vn/images/20260310/1773128231666-TRA_GAO_RANG_CREAMY.jpg');

    -- 3. Category: FRUIT TEA (FT)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'FRUIT TEA') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Mận Đào Hoa Nhài', 35000, 'https://image.foodbook.vn/images/20260310/1773129237309-MAN_AO_HOA_NHAI.jpg'),
    (v_cat_id, 'Trà Cam Quýt', 35000, 'https://image.foodbook.vn/images/20260310/1773128958383-TRA_CAM_QUYT.jpg'),
    (v_cat_id, 'Trà Nhãn Phô Mai', 35000, 'https://image.foodbook.vn/images/20260310/1773128659437-TRA_NHAN_PHO_MAI.jpg'),
    (v_cat_id, 'Oolong Cóc Đác', 35000, 'https://image.foodbook.vn/images/20260310/1773129268236-OLONG_COC_AC.jpg'),
    (v_cat_id, 'Trà Lài Vải', 35000, 'https://image.foodbook.vn/images/20260310/1773128898820-TRA_LAI_VAI.jpg'),
    (v_cat_id, 'Trà Lài Đác Thơm', 35000, 'https://image.foodbook.vn/images/20260310/1773128623194-TRA_LAI_AC_THOM.jpg'),
    (v_cat_id, 'Trà Đào Dầm Đặc Biệt', 35000, 'https://image.foodbook.vn/images/20260310/1773129017505-TRA_AO_DAM_AC_BIET.jpg'),
    (v_cat_id, 'Lucky Tea', 35000, 'https://image.foodbook.vn/images/20260310/1773129170651-LUCKY_TEA.jpg'),
    (v_cat_id, 'Trà Hibicus Nhiệt Đới', 35000, 'https://image.foodbook.vn/images/20260310/1773128861855-TRA_HIBICUS_NHIET_OI.jpg'),
    (v_cat_id, 'Trà Lựu Củ Năng', 35000, 'https://image.foodbook.vn/images/20260310/1773128747840-TRA_LUU_CU_NANG.jpg'),
    (v_cat_id, 'Trà Tắc Mật Ong', 20000, 'https://image.foodbook.vn/images/20260310/1773129098555-TRA_TAC_MAT_ONG.jpg'),
    (v_cat_id, 'Hồng Trà Chanh', 20000, 'https://image.foodbook.vn/images/20260310/1773129061990-HONG_TRA_CHANH.jpg'),
    (v_cat_id, 'Tứ Quý Mãng Cầu', 35000, 'https://image.foodbook.vn/images/20260310/1773129130366-TU_QUY_MANG_CAU.jpg');

    -- 4. Category: MILK TEA (MT)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'MILK TEA') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà sữa olong', 25000, 'https://image.foodbook.vn/images/20260202/1770031355342-HONG_TRA_SUA.jpg'),
    (v_cat_id, 'Trà Sữa Lài Hạnh Nhân', 25000, 'https://image.foodbook.vn/images/20260310/1773130712050-TRA_SUA_LAI_HANH_NHAN.jpg'),
    (v_cat_id, 'Trà Sữa Chôm Chôm', 35000, 'https://image.foodbook.vn/images/20260310/1773130757738-TRA_SUA_CHOM_CHOM.jpg'),
    (v_cat_id, 'Matcha Latte', 35000, 'https://image.foodbook.vn/images/20260310/1773131102817-MATCHA_LATTE.jpg'),
    (v_cat_id, 'Vani Cheese', 35000, 'https://image.foodbook.vn/images/20260202/1770025693099-VANI_CHEESE.jpg'),
    (v_cat_id, 'Trà Sữa Hạt Dẻ', 30000, 'https://image.foodbook.vn/images/20260310/1773130940013-TRA_SUA_HAT_DE.jpg'),
    (v_cat_id, 'Trà Sữa Nguyên Lá Crane Tea', 30000, 'https://image.foodbook.vn/images/20260226/1772103126813-TRA_SUA_NGUYEN_LA.jpg'),
    (v_cat_id, 'Oolong Lài Sữa Trân Châu Trà', 35000, 'https://image.foodbook.vn/images/20260310/1773130490120-OLONG_LAI_SUA_TRAN_CHAU_TRA.jpg'),
    (v_cat_id, 'Trà Sữa Lài', 25000, 'https://image.foodbook.vn/images/20260310/1773130672790-TRA_SUA_LAI_HANH_NHAN.jpg'),
    (v_cat_id, 'Hồng Trà Sữa', 20000, 'https://image.foodbook.vn/images/20260310/1773131068348-HONG_TRA_SUA.jpg'),
    (v_cat_id, 'Trà Sữa Olong', 25000, 'https://image.foodbook.vn/images/20260310/1773130828896-TRA_SUA_OLONG.jpg'),
    (v_cat_id, 'Trà Sữa Hokkaido', 30000, 'https://image.foodbook.vn/images/20260310/1773130977849-TRA_SUA_HOKKAIDO.jpg'),
    (v_cat_id, 'Trà Sữa Thiết', 25000, 'https://image.foodbook.vn/images/20260310/1773131007348-TRA_SUA_THIET.jpg'),
    (v_cat_id, 'Trà Sữa Gạo Rang Phô Mai', 35000, 'https://image.foodbook.vn/images/20260310/1773130453405-TRA_SUA_GAO_RANG_PHO_MAI.jpg');

    -- 5. Category: CREAMY (C)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'CREAMY') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Trà Lài Creamy', 25000, 'https://image.foodbook.vn/images/20260310/1773129305915-TRA_LAI_CREAMY.jpg'),
    (v_cat_id, 'Trà Đen Creamy', 25000, 'https://image.foodbook.vn/images/20260310/1773129337256-TRA_EN_CREAMY.jpg'),
    (v_cat_id, 'Trà Oolong Creamy', 25000, 'https://image.foodbook.vn/images/20260310/1773129372002-TRA_OLONG_CREAMY.jpg');

    -- 6. Category: COFFEE (CF)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'COFFEE') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Bạc xỉu', 30000, 'https://image.foodbook.vn/images/20260413/1776052520643-z7719968886662_fdaf912dd483d4f169204f1af277eee3.jpg'),
    (v_cat_id, 'Sữa tươi cà phê', 30000, 'https://image.foodbook.vn/images/20260413/1776052520643-z7719968886662_fdaf912dd483d4f169204f1af277eee3.jpg'),
    (v_cat_id, 'Café Đá', 20000, 'https://image.foodbook.vn/images/20260310/1773129396025-CAFE_A.jpg'),
    (v_cat_id, 'Café Sữa', 25000, 'https://image.foodbook.vn/images/20260310/1773129415267-CAFE_SUA.jpg'),
    (v_cat_id, 'Caramel Macchiato', 30000, 'https://image.foodbook.vn/images/20260310/1773129470177-CARAMEL_MACCHIATO.jpg'),
    (v_cat_id, 'Socola Đá', 25000, 'https://image.foodbook.vn/images/20260205/1770267604357-SOCOLA.jpg');

    -- 7. Category: DESSERT (DE)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'DESSERT') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Mochi Kem Trà Xanh Nhật', 20000, 'https://image.foodbook.vn/images/20260310/1773129531045-MOCHI_MATCHA.jpg'),
    (v_cat_id, 'Mochi Kem Socola Nhật', 20000, 'https://image.foodbook.vn/images/20260310/1773129553449-MOCHI_SOCOLA.jpg'),
    (v_cat_id, 'Bánh Flan Café (2 Cái)', 30000, 'https://image.foodbook.vn/images/20260310/1773129494793-BANH_FLAN.jpg');

    -- 8. Category: ĂN VẶT (AV)
    INSERT INTO categories (brand_id, name) 
    VALUES (v_brand_id, 'ĂN VẶT') 
    ON CONFLICT (brand_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    INSERT INTO drinks (category_id, name, price, image_url) VALUES
    (v_cat_id, 'Bánh tráng sate tắc', 10000, 'https://image.foodbook.vn/images/20260310/1773131759331-BANH_TRANG.jpg');

END $$;

DO $$
DECLARE
    v_brand_id UUID;
BEGIN
    -- Lấy ID của brand Crane Tea
    SELECT id INTO v_brand_id FROM brands WHERE name = 'Crane Tea';
    
    -- Nếu chưa có brand Crane Tea thì tạo mới
    IF v_brand_id IS NULL THEN
        INSERT INTO brands (name) VALUES ('Crane Tea') RETURNING id INTO v_brand_id;
    END IF;

    -- Import danh sách Topping từ file JSON (loại bỏ trùng lặp nếu có)
    INSERT INTO toppings (brand_id, name, price) VALUES
        (v_brand_id, 'Kim Châu Phô Mai Mật Ong', 15000),
        (v_brand_id, 'Đác Rim Thơm', 10000),
        (v_brand_id, 'Thạch quế hoa', 10000),
        (v_brand_id, 'Tép Quýt', 10000),
        (v_brand_id, 'Creamy', 10000),
        (v_brand_id, 'Nhãn', 10000),
        (v_brand_id, 'Thạch củ năng', 10000),
        (v_brand_id, 'Trân Châu Trắng', 10000),
        (v_brand_id, 'Thạch Đào', 10000),
        (v_brand_id, 'Vải', 10000),
        (v_brand_id, 'Đào', 10000),
        (v_brand_id, 'Trân Châu Đen', 10000),
        (v_brand_id, 'Trân Châu Caramel', 10000),
        (v_brand_id, 'Phô Mai Tươi', 10000),
        (v_brand_id, 'Trân Châu Trà', 10000),
        (v_brand_id, 'Mứt Mãng Cầu', 10000),
        (v_brand_id, 'Tàu Hũ', 10000),
        (v_brand_id, 'Bánh Flan Trứng', 10000),
        (v_brand_id, 'Chôm Chôm', 10000)
    ON CONFLICT (brand_id, name) DO NOTHING;
END $$;