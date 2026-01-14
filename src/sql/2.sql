DO $$
DECLARE
    brand_id UUID;
    cat_id UUID;
BEGIN
    INSERT INTO brands (name) VALUES ('Hồng trà Ngô Gia') RETURNING id INTO brand_id;

    -- Category: Thuần trà
    INSERT INTO categories (brand_id, name) VALUES (brand_id, 'Thuần trà') RETURNING id INTO cat_id;
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