DROP TABLE IF EXISTS brands, drinks;

-- 1) Tables
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS drinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL,
  category TEXT,
  name TEXT NOT NULL,
  price NUMERIC CHECK (price >= 0),
  image_url TEXT,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

-- Unique index chống trùng
CREATE UNIQUE INDEX IF NOT EXISTS drinks_unique_per_brand
ON drinks (brand_id, category, name);

-- 2) Brand
INSERT INTO brands (name)
VALUES ('Hồng trà Ngô Gia')
ON CONFLICT DO NOTHING;

-- =========================
-- 3) Drinks
-- =========================

-- Thuần trà
WITH b AS (SELECT id FROM brands WHERE name = 'Hồng trà Ngô Gia' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Thuần trà', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
  ('Trà Ô Long Bạch Đào', 19000, 'https://wujiateavn.com/files/product/tra-o-long-bach-dao-akhvdobi.png'),
  ('Hồng trà bí đao', 19000, 'https://wujiateavn.com/files/product/hong-tra-bi-dao-sccrscoa.jpg'),
  ('Trà Xanh Bí Đao', 19000, 'https://wujiateavn.com/files/product/tra-xanh-bi-dao-t9gm7g3c.jpg'),
  ('Trà Xanh Hoa Nhài', 19000, 'https://wujiateavn.com/files/product/tra-xanh-hoa-nhai-f2vkxmvu.jpg'),
  ('Hồng Trà Vải Thiều', 19000, 'https://wujiateavn.com/files/product/hong-tra-vai-thieu-2isu3y9o.jpg'),
  ('Trà Bí Đao Ngô Gia', 19000, 'https://wujiateavn.com/files/product/tra-bi-dao-ngo-gia-q38efry9.jpg'),
  ('Hồng Trà Đài Loan', 16000, 'https://wujiateavn.com/files/product/hong-tra-dai-loan-zvyjy3xt.jpg')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- Trà sữa
WITH b AS (SELECT id FROM brands WHERE name = 'Hồng trà Ngô Gia' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Trà sữa', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
  ('Trà Sữa Uyên Ương', 21000, 'https://wujiateavn.com/files/product/tra-sua-uyen-uong-cwcuqu7e.png'),
  ('Trà Sữa Ô Long', 24000, 'https://wujiateavn.com/files/product/tra-sua-o-long-xhhihels.png'),
  ('Trà sữa socola', 28000, 'https://wujiateavn.com/files/product/tra-sua-socola-kryfxhvq.png'),
  ('Trà Sữa Trân Châu Đường Đen', 26000, 'https://wujiateavn.com/files/product/tra-sua-tran-chau-duong-den-8ke6swxe.jpg'),
  ('Trà Xanh Sữa', 24000, 'https://wujiateavn.com/files/product/tra-xanh-sua-efbubhnb.jpg'),
  ('Trà Sữa Vải Thiều', 24000, 'https://wujiateavn.com/files/product/tra-sua-vai-thieu-mcpbo5wd.jpg'),
  ('Trà Sữa Bí Đao', 24000, 'https://wujiateavn.com/files/product/tra-sua-bi-dao-qxo9y6dn.jpg'),
  ('Trà Sữa Đài Loan', 21000, 'https://wujiateavn.com/files/product/tra-sua-dai-loan-qlgi7h4z.jpg')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- Trà latte
WITH b AS (SELECT id FROM brands WHERE name = 'Hồng trà Ngô Gia' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Trà latte', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
  ('Sữa Tươi Khoai Môn Nghiền', 41000, 'https://wujiateavn.com/files/product/sua-tuoi-khoai-mon-nghien-3ibpgbff.png'),
  ('Ô Long Latte', 31000, 'https://wujiateavn.com/files/product/o-long-latte-xibmdaoa.png'),
  ('Sữa Tươi Trân Châu Đường Đen ', 44000, 'https://wujiateavn.com/files/product/sua-tuoi-tran-chau-duong-den-d2mz99ew.png'),
  ('Trân châu đường đen latte', 33000, 'https://wujiateavn.com/files/product/sua-tuoi-tran-chau-duong-den-5stas08q.jpg'),
  ('Trà Xanh Latte', 31000, 'https://wujiateavn.com/files/product/tra-xanh-latte-lbm6ltnr.jpg'),
  ('Hồng Trà Latte Vải Thiều', 31000, 'https://wujiateavn.com/files/product/hong-tra-latte-vai-thieu-w3lcixhg.jpg'),
  ('Bí Đao Latte', 31000, 'https://wujiateavn.com/files/product/bi-dao-latte-dmzbutlw.jpg'),
  ('Hồng Trà latte Đài Loan', 28000, 'https://wujiateavn.com/files/product/hong-tra-latte-dai-loan-kvmyjjtc.jpg')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- Trà trái cây
WITH b AS (SELECT id FROM brands WHERE name = 'Hồng trà Ngô Gia' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Trà trái cây', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
  ('Ô Long Nho', 30000, 'https://wujiateavn.com/files/product/o-long-nho-st0xvjet.png'),
  ('Trà Ô Long Đào', 29000, 'https://wujiateavn.com/files/product/tra-o-long-dao-qbpryj3f.png'),
  ('Màu Hồng Lãng Mạn', 29000, 'https://wujiateavn.com/files/product/mau-hong-lang-man-ynqbujnz.png'),
  ('Trà Xanh Đào Ngô Gia', 29000, 'https://wujiateavn.com/files/product/tra-xanh-dao-ngo-gia-gybsj8ga.png'),
  ('Hồng Trà Đào Ngô Gia', 29000, 'https://wujiateavn.com/files/product/hong-tra-dao-ngo-gia-oown3ciw.png'),
  ('Trà Xanh Chanh', 24000, 'https://wujiateavn.com/files/product/tra-xanh-chanh-tolzbxkm.jpg'),
  ('Hồng Trà Chanh Vải Thiều', 24000, 'https://wujiateavn.com/files/product/hong-tra-chanh-vai-thieu-zlk6nqui.jpg'),
  ('Bí Đao Chanh', 24000, 'https://wujiateavn.com/files/product/tra-bi-dao-chanh-iioyjqd0.jpg'),
  ('Hồng Trà Chanh Đài Loan', 21000, 'https://wujiateavn.com/files/product/hong-tra-chanh-dai-loan-gn8vd5fl.png')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- Hot
WITH b AS (SELECT id FROM brands WHERE name = 'Hồng trà Ngô Gia' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Thức Uống "Hot"', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
  ('Hồng Trà Trứng Khủng Long', 26000, 'https://wujiateavn.com/files/product/hong-tra-trung-khung-long-mp4kvvud.png'),
  ('Trà Sữa Long Châu', 29000, 'https://wujiateavn.com/files/product/tra-sua-long-chau-s04uejea.png'),
  ('Ô Long Ô Mai Chanh Dây', 27000, 'https://wujiateavn.com/files/product/o-long-o-mai-chanh-day-n18ybfft.png'),
  ('Trà Xanh Ô Mai Chanh Dây', 27000, 'https://wujiateavn.com/files/product/tra-xanh-o-mai-chanh-day-uvczfiaw.png'),
  ('Trà Sữa Ô Long Khoai Môn Nghiền', 33000, 'https://wujiateavn.com/files/product/tra-sua-o-long-khoai-mon-nghien-khyl84yb.png'),
  ('Trà Sữa Khoai Môn Nghiền', 30000, 'https://wujiateavn.com/files/product/tra-sua-khoai-mon-nghien-q1qeexkd.png'),
  ('Trà Ô Long Bí Đao', 22000, 'https://wujiateavn.com/files/product/tra-o-long-bi-dao-qyfxl4ee.png'),
  ('Bát Bảo Ngô Gia (Ngọt)', 28000, 'https://wujiateavn.com/files/product/bat-bao-ngo-gia-ngot-ozomolpg.png'),
  ('Hồng Trà Kem Tươi', 23000, 'https://wujiateavn.com/files/product/hong-tra-kem-tuoi-44n8f9am.png')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- Mới
WITH b AS (SELECT id FROM brands WHERE name = 'Hồng trà Ngô Gia' LIMIT 1)
INSERT INTO drinks (brand_id, category, name, price, image_url)
SELECT b.id, 'Thức Uống Mới', v.name, v.price, v.image_url
FROM b
CROSS JOIN (VALUES
  ('Ô Long Kem Cheese', 26000, 'https://wujiateavn.com/files/product/o-long-kem-cheese-wlmfb7sr.png'),
  ('Trà Xanh Kem Cheese', 26000, 'https://wujiateavn.com/files/product/tra-xanh-kem-cheese-hrkfrdsv.png'),
  ('Hồng Trà Kem Cheese', 23000, 'https://wujiateavn.com/files/product/hong-tra-kem-cheese-pmj1l1ce.png'),
  ('Trà Xí Muội Ô Long', 23000, 'https://wujiateavn.com/files/product/tra-xi-muoi-o-long-2azq859w.png'),
  ('Trà Xí Muội Bí Đao', 23000, 'https://wujiateavn.com/files/product/tra-xi-muoi-bi-dao-pvasxw4r.png'),
  ('Trà Xí Muội Ngô Gia', 20000, 'https://wujiateavn.com/files/product/tra-xi-muoi-ngo-gia-ruyblr3c.png')
) AS v(name, price, image_url)
ON CONFLICT DO NOTHING;

-- Check
SELECT category, COUNT(*) AS total
FROM drinks
GROUP BY category
ORDER BY category;
