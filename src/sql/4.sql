DROP TABLE IF EXISTS toppings;

CREATE TABLE IF NOT EXISTS toppings (
  id SERIAL PRIMARY KEY,
  brand_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  CONSTRAINT uq_brand_topping UNIQUE (brand_id, name)
);

DO $$
DECLARE
    v_brand_id UUID;
BEGIN
    SELECT id INTO v_brand_id FROM brands WHERE name = 'Hồng trà Ngô Gia';
    
    IF v_brand_id IS NULL THEN
        INSERT INTO brands (name) VALUES ('Hồng trà Ngô Gia') RETURNING id INTO v_brand_id;
    END IF;

    INSERT INTO toppings (brand_id, name, price) VALUES
        (v_brand_id, 'Trân Châu Ngũ Sắc', 5000),
        (v_brand_id, 'Kem Cheese', 7000),
        (v_brand_id, 'Hạt É', 3000),
        (v_brand_id, 'Thạch Sương Sáo Viên', 5000),
        (v_brand_id, 'Khoai Môn Nghiền', 7000),
        (v_brand_id, 'Thạch Q Ngô Gia', 3000),
        (v_brand_id, 'Thạch Aiyu', 5000),
        (v_brand_id, 'Trân Châu 3Q Trắng', 5000),
        (v_brand_id, 'Đào Miếng', 5000), -- Dòng Đào Miếng 1
        (v_brand_id, 'Thạch Sương Sáo', 3000),
        (v_brand_id, 'Trân Châu Đường Đen', 5000),
        (v_brand_id, 'Trân Châu Khoai Môn', 5000),
        (v_brand_id, 'Pudding Trứng', 7000),
        (v_brand_id, 'Thạch Dừa Hương Đào', 5000),
        (v_brand_id, 'Kem Tươi Vani', 7000),
        (v_brand_id, 'Hạt Sen', 7000),
        (v_brand_id, 'Thạch Dừa', 3000),
        (v_brand_id, 'Hạt Thủy Tinh Củ Năng', 5000),
        (v_brand_id, 'Trân Châu Vị Dâu', 7000),
        (v_brand_id, 'Trân Châu Củ Năng', 7000),
        (v_brand_id, 'Viên Khoai Dẻo Tam Sắc', 5000),
        (v_brand_id, 'Bánh Vuông Đường Đen', 5000);
END $$;