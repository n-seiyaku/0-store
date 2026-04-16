CREATE TABLE IF NOT EXISTS sizes (
  id SERIAL PRIMARY KEY,
  category_id UUID NOT NULL
  size VARCHAR(2) NOT NULL,
  addition_price NUMERIC NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

DO $$
DECLARE
    v_brand_id UUID;
    v_cat_id UUID;
BEGIN
    -- 1. Tạo hoặc lấy Brand ID
    INSERT INTO brands (name) VALUES ('Phúc Long')
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_brand_id;

    -- 2. Lấy Category ID (Sửa lỗi tại đây)
    SELECT id INTO v_cat_id 
    FROM categories 
    WHERE brand_id = v_brand_id AND name = 'Trà trái cây';

    -- 3. Thêm Sizes
    INSERT INTO sizes (category_id, size, addition_price) VALUES
        (v_cat_id, 'M', 0),
        (v_cat_id, 'L', 5000);
END $$;



-- ssss
WITH brand_info AS (
    SELECT id FROM brands WHERE name = 'Crane Tea' LIMIT 1
)
INSERT INTO categories (brand_id, name)
SELECT brand_info.id, val.name
FROM brand_info, (VALUES 
    ('MÓN MỚI'),
    ('FRUIT TEA'),
    ('MILK TEA'),
    ('CREAMY'),
    ('COFFEE'),
    ('COLD BREW MILK TEA'),
    ('DESSERT'),
    ('ĂN VẶT'),
    ('THỨC UỐNG KHÁC')
) AS val(name)
ON CONFLICT (brand_id, name) DO NOTHING;