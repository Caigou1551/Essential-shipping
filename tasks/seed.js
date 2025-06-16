/*
  Inserts dummy data into the tables created by schema.js for testing. NOTE:
  Running this code will "reset" all data from existing tables.
*/

import * as _ from "./schema.js"; //Execute schema overwrite

import {connect, disconnect} from "../database/connection.js";
let client = await connect();

//Users (passwords are "hashed_pwd{1-15}")
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('admin_alpha', '$2b$10$0VdIae6nIn5jql8nGYIq8.GAnRSaIi3UmSSnGY7B8iXb53VUwERX2', 'Alice', 'Anderson', '4111-1111-1111-1111', '123 Admin Ave, Capital City, AD', true);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_beta', '$2b$10$Ab0993wbt2Dsiivno0hm9uYPQ1FM.1NCVT8KlRxGkst4H4lC4izK2', 'Bob', 'Brown', '4222-2222-2222-2222', '456 Maple St, Springfield, SP', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_gamma', '$2b$10$12VphIpESiiBSgWO4Wb/tuj8UhF2TL/w3KFhodeUnhKO7qAqXzdDq', 'Carol', 'Garcia', '4333-3333-3333-3333', '789 Oak Road, Rivertown, RT', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_delta', '$2b$10$c81NJtbMgjQkZzj5Qfjog.E07fsUYiNTDxJJ3D3U6NY3/pxHN5ZqS', 'David', 'Davis', '4444-4444-4444-4444', '101 Pine Lane, Lakeview, LV', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_epsilon', '$2b$10$Km8JMqXhrB1F8ExG/KYGA.dKCeVbQculsJDg5RJ50sSM8PCipkb9C', 'Eva', 'Edwards', '4555-5555-5555-5555', '202 Birch Blvd, Hilltown, HT', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_zeta', '$2b$10$1NDhRxc8MmZXjOv2Czo4I.vFwHlMDC5uDeFJaFK9T7EVxHw4o2jC6', 'Frank', 'Foster', '4666-6666-6666-6666', '303 Cedar Circle, Greenfield, GF', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_eta', '$2b$10$Co7k.bleE3uLD3UUW/8vTOyBxBG7HgzVk1EJO/4Dy/9hQcQxMJOpS', 'Grace', 'Harris', '4777-7777-7777-7777', '404 Walnut Way, Brookside, BS', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_theta', '$2b$10$y7SewianKdi0LRvO/gU6YuX4OCIIFHZfUa2XaGw2WgNdo43FYeET6', 'Henry', 'Ibrahim', '4888-8888-8888-8888', '505 Elm Street, Fairview, FV', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_iota', '$2b$10$kKUWb3ZRxv9QMrkvi5bXX.PfZibUEKxuJxWHllwrRl/ZkoRolGx6y', 'Ivy', 'Johnson', '4999-9999-9999-9999', '606 Spruce Drive, Centerville, CV', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_kappa', '$2b$10$nOj2HRVhjCLm/OX1sqaI6eyE9siT8A9BDdZM64bC5ontb8dPxypT2', 'Jack', 'King', '4110-1010-1110-1210', '707 Poplar Plaza, Lakeside, LS', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_lambda', '$2b$10$NadWXOmvSdgbh8M1Kj5Hf.rIf90a9tc/OLVTh.4S6kjeucGGB1pkW', 'Karen', 'Lopez', '4220-2020-2220-2420', '808 Aspen Alley, Riverdale, RD', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_mu', '$2b$10$Go4tUQF3DY.bLK8ohwQt0OSxFYZCQbFR72/iytEH91RVMPO77EbT.', 'Leo', 'Martinez', '4330-3030-3330-3630', '909 Fir Forest, Mountainview, MV', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_nu', '$2b$10$nozgcBnMepkYq2reGrY9we2NOSZzejHHYNE2OFY4t2ucwn6j5rH2i', 'Mia', 'Nelson', '4440-4040-4440-4840', '1010 Cherry Cres, Valleyview, VV', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_xi', '$2b$10$VPuNAAQhfj/otR0Nzju0yekvPdn2ueOLHSw.Ur.XThAjGv3qlwxty', 'Noah', 'Ortiz', '4550-5050-4550-5050', '1111 Maple Court, Brookfield, BF', false);`);
await client.query(`INSERT INTO shipping.user (username, password, first_name, last_name, cc_info, shipping_address, admin) VALUES ('user_omicron', '$2b$10$sSYJg9X8CIL3yPoL2EAeh.yQ75YIjWG4yIdfCWhmqrOtUFzYQ2Lg6', 'Olivia', 'Parker', '4660-6060-4660-6060', '1212 Willow Way, Newtown, NT', false);`);

//Stores
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('supermart101', '$2b$10$nctdjFGH3xFKRRjhDpPnJOth0BRv7/MUGnI/3NJcbrQVtG5n4JUpi', 'SuperMart One', '123 Market Street, Springfield, IL');`); //pwdHashA1
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('freshfinds22', '$2b$10$73ab5XfsXSGgn/mHRdrgoO/wv6FFa06WX8Pg.Hin3s9MzlqlvSKUO', 'Fresh Finds', '456 Elm Street, Madison, WI');`); //pwdHashB2
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('urbangrocer33', '$2b$10$lx6z/JBVRxKhAG2XZaYUtOuLTPQr4PJuxiKgjY0qtO.I9tM0s1Iri', 'Urban Grocer', '789 Oak Avenue, Seattle, WA');`); //pwdHashC3
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('greenbaskets44', '$2b$10$rVYTkmOFF7TGfi.bXZukH.xd/LtaexcZ2ztlgw2irawilD7nGmi1K', 'Green Baskets', '321 Pine Road, Denver, CO');`); //pwdHashD4
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('costsaver55', '$2b$10$obO5t/WymHN.5OpdyIwDJeli8co12fcLJ8knw8hA.Hk5abpY7bcLK', 'Cost Saver', '654 Maple Drive, Austin, TX');`); //pwdHashE5
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('marketplace66', '$2b$10$TAhhcui0iTm7qjjiSm52G.1piGVErlhJa/nGxLVI08oxMuyOTldcO', 'Market Place', '987 Cedar Blvd, Portland, OR');`); //pwdHashF6
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('dailydeals77', '$2b$10$Nf2AOhsN5kOD1ct6vnODlOBdrhtJs4SYgx/Od2woy29BWgWsfGRzu', 'Daily Deals Mart', '135 Birch Lane, Columbus, OH');`); //pwdHashG7
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('maximart88', '$2b$10$3nC4xZY3Am2kg863i.r2FOQnPkX114vRqv1A.VbPBA7WUXCh1jCxK', 'MaxiMart', '246 Walnut Street, Boston, MA');`); //pwdHashH8
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('savingspot99', '$2b$10$x7KqafHbaGT3SwK9oJZuN.bS3lpJ7nO9ONUZrmO/m5xIfdMDL4LMC', 'Savings Pot', '357 Spruce Court, Atlanta, GA');`); //pwdHashI9
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('valueville10', '$2b$10$1HikT3tyGSmJr3nV4P8zC.EU.OM.GgUhPKTOxMlSHVJxnu6cotJHi', 'Value Ville', '468 Chestnut Ave, Miami, FL');`); //pwdHashJ10
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('pricemart11', '$2b$10$D/kebcMDL/iVIP3jF1q.KOnKQid8QyK7L5v37QazC2uOYzVIwQfU2', 'Price Mart', '579 Hickory Street, Phoenix, AZ');`); //pwdHashK11
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('shopnship12', '$2b$10$HZOCbYmdMYvdHh8ra5e.GeME7KOzI1u9EQtlXrih/uggLmF31LLfS', 'Shop N Ship', '680 Aspen Drive, Las Vegas, NV');`); //pwdHashL12
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('budgetbazaar13', '$2b$10$ys8njxOVGlenL.Mcdg5rN.XMGd2QCSL077.JvgYn4IRNeppjS2RHS', 'Budget Bazaar', '791 Poplar Way, Orlando, FL');`); //pwdHashM13
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('quickcart14', '$2b$10$t5BCtupWYpJ2aditBuBhLe34lfcnRxzVoG6/NPz7U8XmNmVAWjH4e', 'Quick Cart', '802 Redwood Road, Sacramento, CA');`); //pwdHashN14
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('smartshop15', '$2b$10$qAkDtMMHXBjcZ.u7X/LnGeEf7o3LymCYBReRwu0y7RuitriuwbqCG', 'Smart Shop', '913 Fir Street, Detroit, MI');`); //pwdHashO15
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('ecomart16', '$2b$10$u1bmOXqLFGcHiq0GvraVDO8qvWT2bEuMRVzFux5NblbT9aMSCLdAO', 'EcoMart', '124 Olive Street, San Diego, CA');`); //pwdHashP16
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('urbanmarket17', '$2b$10$Wa1ZFFcUGiOI8NiMJAormeQ9PtP2uXv8fqtiWWA9ycoU4XBbxfNsq', 'Urban Market', '235 Willow Ave, Philadelphia, PA');`); //pwdHashQ17
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('centralgrocery18', '$2b$10$hWMUxuNzB4TBljw.dsUULOkZFz8YEyX7.cVVuYlkeqrKgqIF58Cpq', 'Central Grocery', '346 Sycamore Blvd, Charlotte, NC');`); //pwdHashR18
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('localmart19', '$2b$10$Jw8kkkrIfxIkhDW8X0.wZ.8XYT45Z/MnpZSYMj9/AaRruCwj0/qIm', 'Local Mart', '457 Magnolia Street, Nashville, TN');`); //pwdHashS19
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('neighborhood20', '$2b$10$UuXuT6Z6iep.pgbDYC1tme1ndQV59P9IHdHyPrqmvOucD/whFM2Wa', 'Neighborhood Grocers', '568 Cypress Road, Cincinnati, OH');`); //pwdHashT20
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('familyshop21', '$2b$10$73Rpc0cs4XUIecixkEbBAuX.xwsFO5xbRarpKzXe29X4PP79F8xvG', 'Family Shop', '679 Dogwood Drive, Raleigh, NC');`); //pwdHashU21
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('everydayessentials22', '$2b$10$idwfi0fxnGkm42QvhZEpQ.zMgiJa.KZmfYMrTR61SnNAW0jvBENi6', 'Everyday Essentials', '780 Juniper Lane, Salt Lake City, UT');`); //pwdHashV22
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('choicecart23', '$2b$10$QaeStINGVfMsYUeCBwI1Fu/43eRSAq0uVd/yGl9WtzNEB7atezKda', 'Choice Cart', '891 Alder Avenue, Kansas City, MO');`); //pwdHashW23
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('wholesalemart24', '$2b$10$uxCYlBoGc1PZIoFDLDoyeehp19Qa16ADTtlITSeEBC/uZyMh97gNa', 'Wholesale Mart', '902 Beech Street, Milwaukee, WI');`); //pwdHashX24
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('dailyfresh25', '$2b$10$uRUM/3eEYoeq4MAURIXWaOLapxPWi.AElCL8l.VqSFfhk1l1N7X.K', 'Daily Fresh Market', '123 Palm Drive, Tampa, FL');`); //pwdHashY25
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('metroshop26', '$2b$10$AY33kXM7zKIlwEQl7zraPuCyPBZd9/PjqzkbcXKqCwWFr0N23mKHa', 'Metro Shop', '234 Redwood Lane, New Orleans, LA');`); //pwdHashZ26
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('citycentral27', '$2b$10$zRq/9R9OebZ/pmKCGByIaungdbo71q/1.yb/eiIBAsRczOS5e4W0.', 'City Central', '345 Larch Street, Indianapolis, IN');`); //pwdHashAA27
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('neonmart28', '$2b$10$huDKX1CyPSuFxJEOtN1yoeEb76k3rIaiXV6TjaP1kdAG.3ljNdf52', 'Neon Mart', '456 Sequoia Blvd, San Jose, CA');`); //pwdHashBB28
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('selectshop29', '$2b$10$8bEiAE2U319LAPMnraz3ZupEjPo4utInKnNPDJIYjf7AbHD5nRevS', 'Select Shop', '567 Hemlock Road, Cleveland, OH');`); //pwdHashCC29
await client.query(`INSERT INTO shipping.store (username, password, store_name, location) VALUES ('townmarket30', '$2b$10$rFUFsGYDedZK/CppQH.2yuj6yuCDzrrD2XbjUmvmCaV51dJmqDCTq', 'Town Market', '678 Redwood Street, Detroit, MI');`); //pwdHashDD30

//Products
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (1, 'Organic Almond Butter', 'NutriBlend', 'Food', 9.99, 50);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (2, 'Gluten-Free Bread', 'HealthyBake', 'Food', 4.50, 30);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (3, 'Pain Relief Tablet', 'MediCure', 'Medical', 5.99, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (4, 'Vitamin C 1000mg', 'HealthPlus', 'Medical', 12.99, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (5, 'Herbal Shampoo', 'SilkyLocks', 'Hair Care', 10.99, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (6, 'Conditioner Plus', 'HairGlow', 'Hair Care', 11.50, 35);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (7, 'Eco-Friendly Toothbrush', 'GreenSmile', 'Dental', 3.99, 120);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (8, 'Whitening Toothpaste', 'BrightSmile', 'Dental', 4.25, 95);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (9, 'Natural Body Wash', 'PureBath', 'Toiletries', 6.75, 60);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (10, 'Gentle Facial Cleanser', 'FreshFace', 'Toiletries', 8.50, 45);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (11, 'Antibacterial Hand Soap', 'SafeHands', 'Cleaning', 3.49, 150);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (12, 'Disinfecting Wipes', 'CleanSweep', 'Cleaning', 5.99, 200);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (13, 'Herbal Face Cream', 'NatureGlow', 'Toiletries', 14.99, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (14, 'Minty Mouthwash', 'FreshBreath', 'Dental', 4.75, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (15, 'Nutritional Energy Bar', 'FuelUp', 'Food', 2.50, 150);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (16, 'Fresh Vegetable Medley', 'GreenHarvest', 'Food', 7.99, 70);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (17, 'Cough Syrup', 'HealWell', 'Medical', 6.50, 90);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (18, 'First Aid Kit', 'SureAid', 'Medical', 19.99, 25);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (19, 'Anti-Dandruff Shampoo', 'ClearScalp', 'Hair Care', 9.99, 55);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (20, 'Leave-In Conditioner', 'SoftStrands', 'Hair Care', 8.75, 60);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (21, 'Luxury Perfume', 'AromaElite', 'Toiletries', 45.00, 15);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (22, 'Dental Floss', 'CleanLine', 'Dental', 2.99, 110);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (23, 'Heavy Duty Cleaner', 'PowerScrub', 'Cleaning', 7.25, 65);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (24, 'Stainless Steel Scrub', 'SparklePro', 'Cleaning', 4.99, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (25, 'Organic Rice', 'FarmFresh', 'Food', 12.50, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (26, 'Whole Wheat Pasta', 'GrainGood', 'Food', 3.75, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (27, 'Sterile Bandages', 'MediWrap', 'Medical', 5.50, 140);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (28, 'Vitamin D Supplement', 'SunHealth', 'Medical', 8.99, 70);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (29, 'Nourishing Hair Oil', 'LuxeLocks', 'Hair Care', 10.50, 45);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (30, 'Hair Styling Gel', 'StyleMaster', 'Hair Care', 6.99, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (1, 'Foaming Hand Sanitizer', 'PureGuard', 'Medical', 3.99, 130);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (2, 'Bamboo Toothbrush', 'EcoSmile', 'Dental', 4.25, 95);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (3, 'Wholesome Granola', 'NatureBite', 'Food', 5.99, 75);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (4, 'Multivitamin Gummies', 'VitaChews', 'Medical', 7.50, 120);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (5, 'Deep Cleansing Mask', 'PureSkin', 'Toiletries', 9.50, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (2, 'Whole Grain Cereal', 'GrainyGoodness', 'Food', 6.49, 75);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (5, 'Extra Virgin Olive Oil', 'OliveTree', 'Food', 12.99, 50);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (8, 'Multivitamin Capsules', 'VitaHealth', 'Medical', 15.99, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (12, 'Anti-Dandruff Shampoo', 'CleanScalp', 'Hair Care', 8.99, 60);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (10, 'Sunscreen SPF 50', 'SunShield', 'Toiletries', 9.99, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (15, 'Electric Toothbrush', 'BrightSmile', 'Dental', 29.99, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (3, 'Disinfectant Spray', 'PureClean', 'Cleaning', 4.99, 120);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (7, 'Gluten-Free Pasta', 'PastaPrime', 'Food', 7.49, 55);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (9, 'Allergy Relief Capsules', 'AllerFree', 'Medical', 10.99, 90);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (11, 'Deep Conditioner', 'MoistureLock', 'Hair Care', 10.50, 70);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (14, 'Facial Cleanser', 'PureFace', 'Toiletries', 8.75, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (16, 'Whitening Mouthwash', 'BrightMouth', 'Dental', 5.99, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (18, 'Multi-Surface Cleaner', 'CleanMaster', 'Cleaning', 3.99, 150);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (20, 'Organic Granola Bars', 'SnackTime', 'Food', 2.99, 200);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (22, 'Cough Suppressant Syrup', 'ReliefMed', 'Medical', 7.99, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (4, 'Hair Growth Serum', 'GrowLocks', 'Hair Care', 14.99, 30);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (6, 'Liquid Hand Soap', 'CleanHands', 'Toiletries', 2.50, 180);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (8, 'Dental Floss', 'FlossPro', 'Dental', 3.50, 110);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (10, 'Floor Cleaner', 'SparkleClean', 'Cleaning', 5.49, 90);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (12, 'Organic Apple Juice', 'NatureFresh', 'Food', 4.25, 130);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (15, 'Ibuprofen Tablets', 'PainAway', 'Medical', 6.99, 140);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (17, 'Leave-In Conditioner', 'SilkyStrands', 'Hair Care', 9.99, 65);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (19, 'Body Lotion', 'SoftSkin', 'Toiletries', 7.99, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (21, 'Electric Water Flosser', 'SmileTech', 'Dental', 39.99, 25);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (23, 'Dishwasher Detergent', 'SqueakyClean', 'Cleaning', 6.49, 75);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (25, 'Fresh Organic Salad', 'GreenLeaf', 'Food', 5.50, 95);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (27, 'Antiseptic Cream', 'HealQuick', 'Medical', 4.99, 120);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (29, 'Volumizing Dry Shampoo', 'HairLift', 'Hair Care', 8.99, 60);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (30, 'Moisturizing Face Wash', 'ClearGlow', 'Toiletries', 7.49, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (5, 'Dental Whitening Kit', 'BrightWhite', 'Dental', 24.99, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (3, 'Recycled Paper Towels', 'EcoWipe', 'Cleaning', 3.25, 110);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (7, 'Protein Energy Bar', 'FitFuel', 'Food', 2.75, 150);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (11, 'Antacid Chewables', 'StomachEase', 'Medical', 4.59, 95);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (13, 'Smoothing Hair Cream', 'SleekStyle', 'Hair Care', 7.89, 70);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (17, 'Shower Gel', 'FreshAura', 'Toiletries', 5.99, 130);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (19, 'Fluoride Toothpaste', 'MintyFresh', 'Dental', 3.99, 120);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (21, 'Window Cleaning Spray', 'CrystalClear', 'Cleaning', 4.50, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (23, 'Organic Mixed Nuts', 'NutriMix', 'Food', 8.25, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (25, 'Electrolyte Powder', 'HydraBoost', 'Medical', 11.99, 75);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (27, 'Curl Defining Cream', 'CurlyCharm', 'Hair Care', 9.49, 55);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (29, 'Body Scrub', 'Exfolia', 'Toiletries', 7.25, 90);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (30, 'Interdental Brush', 'SmileCare', 'Dental', 2.99, 140);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (4, 'Oven Cleaner', 'HeatAway', 'Cleaning', 5.75, 65);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (1, 'Artisan Sourdough Bread', 'BreadWorks', 'Food', 5.49, 60);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (2, 'Herbal Immune Booster', 'NatureMed', 'Medical', 13.99, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (3, 'Argan Oil Shampoo', 'LuxeLocks', 'Hair Care', 8.99, 45);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (4, 'Deep Cleansing Face Wash', 'PureSkin', 'Toiletries', 7.25, 70);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (5, 'Electric Dental Flosser', 'SmileBright', 'Dental', 34.99, 30);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (6, 'All-Purpose Floor Cleaner', 'CleanSweep', 'Cleaning', 4.99, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (7, 'Organic Mixed Berry Jam', 'FarmFresh', 'Food', 6.75, 55);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (8, 'First Aid Antiseptic Cream', 'MediSafe', 'Medical', 5.99, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (9, 'Volumizing Hair Mousse', 'StyleBoost', 'Hair Care', 7.89, 65);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (10, 'Aloe Vera Body Gel', 'SkinEssence', 'Toiletries', 6.49, 75);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (11, 'Whitening Dental Strips', 'DentaBright', 'Dental', 19.99, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (12, 'Heavy Duty Degreaser', 'PowerClean', 'Cleaning', 8.50, 90);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (13, 'Organic Baby Food Puree', 'TinyTastes', 'Food', 3.99, 150);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (14, 'Fever Reducer Syrup', 'ThermaMed', 'Medical', 7.50, 65);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (15, 'Repairing Hair Mask', 'NutriLocks', 'Hair Care', 12.99, 50);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (16, 'Moisturizing Shampoo Bar', 'EcoBeauty', 'Toiletries', 5.75, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (17, 'Sensitive Teeth Whitening Gel', 'PearlWhite', 'Dental', 21.49, 35);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (18, 'Heavy Duty Bathroom Cleaner', 'FreshScrub', 'Cleaning', 6.99, 110);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (19, 'Gluten-Free Oatmeal Cookies', 'BakedGoodness', 'Food', 4.25, 95);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (20, 'Herbal Sleep Aid', 'CalmRest', 'Medical', 9.49, 70);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (21, 'Anti-Frizz Hair Serum', 'SleekShine', 'Hair Care', 10.99, 55);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (22, 'Organic Deodorant', 'FreshNature', 'Toiletries', 4.99, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (23, 'Fluoride-Free Toothpaste', 'NatureSmile', 'Dental', 3.75, 120);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (24, 'Heavy Duty Window Cleaner', 'ClearView', 'Cleaning', 5.49, 90);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (25, 'Artisanal Cheese Platter', 'CheeseCraft', 'Food', 14.99, 40);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (26, 'Electrolyte Tablets', 'HydroMed', 'Medical', 8.99, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (27, 'Smoothing Hair Straightener', 'GlamourLocks', 'Hair Care', 29.99, 25);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (28, 'Gentle Facial Moisturizer', 'DermaGlow', 'Toiletries', 11.50, 60);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (29, 'Portable Dental Irrigator', 'OralEase', 'Dental', 27.99, 30);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (30, 'Multi-Surface Vinegar Cleaner', 'EcoScrub', 'Cleaning', 4.25, 140);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (2, 'Natural Granola', 'CrispHarvest', 'Food', 5.99, 80);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (4, 'All-Natural Cough Drops', 'SoothEase', 'Medical', 3.99, 100);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (6, 'Revitalizing Hair Tonic', 'VivaLocks', 'Hair Care', 9.25, 45);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (8, 'Refreshing Body Mist', 'AromaPure', 'Toiletries', 6.49, 75);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (10, 'Sensitive Gum Brush', 'GumCare', 'Dental', 4.99, 85);`);
await client.query(`INSERT INTO shipping.product (store_id, product_name, brand_name, category, price, availability) VALUES (12, 'Lemon-Scented All-Purpose Cleaner', 'ZestClean', 'Cleaning', 5.99, 110);`);

await disconnect();