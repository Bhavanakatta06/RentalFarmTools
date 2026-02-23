INSERT IGNORE INTO users (email, password, name, phone, location)
VALUES ('admin@example.com', '$2a$10$encodedAdminHashHere', 'Admin User', '9999999999', 'Hyderabad');
INSERT IGNORE INTO tools (
    name, category, description, price, price_type, location,
    owner_id, tool_condition, availability, created_at
) VALUES
(
    'John Deere Tractor',
    'Tractors',
    'Heavy-duty tractor perfect for large fields. Well-maintained and reliable.',
    150,
    'day',
    'California, USA',
    1,
    'excellent',
    true,
    CURRENT_TIMESTAMP
);

