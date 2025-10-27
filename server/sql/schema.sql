-- CREATE DATABASE  IF NOT EXISTS `enterprisedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
-- USE `enterprisedb`;
-- -- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
-- --
-- -- Host: 127.0.0.1    Database: enterprisedb
-- -- ------------------------------------------------------
-- -- Server version	8.0.44

-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!50503 SET NAMES utf8 */;
-- /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
-- /*!40103 SET TIME_ZONE='+00:00' */;
-- /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
-- /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
-- /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- --
-- -- Table structure for table `employees`
-- --

-- DROP TABLE IF EXISTS `employees`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `employees` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(100) DEFAULT NULL,
--   `department` varchar(100) DEFAULT NULL,
--   `role` varchar(50) DEFAULT NULL,
--   `salary` decimal(10,2) DEFAULT NULL,
--   `status` varchar(50) DEFAULT NULL,
--   `enterprise_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `enterprise_id` (`enterprise_id`),
--   CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `employees`
-- --

-- LOCK TABLES `employees` WRITE;
-- /*!40000 ALTER TABLE `employees` DISABLE KEYS */;
-- INSERT INTO `employees` VALUES (1,'John','Sales','Executive',30000.00,'Active',1),(2,'Neha','Sales','Executive',40000.00,'Active',1),(5,'Rahul','Marketing','Marketing Coordinator',35000.00,'Active',1);
-- /*!40000 ALTER TABLE `employees` ENABLE KEYS */;
-- UNLOCK TABLES;

-- --
-- -- Table structure for table `enterprises`
-- --

-- DROP TABLE IF EXISTS `enterprises`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `enterprises` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(100) DEFAULT NULL,
--   `location` varchar(100) DEFAULT NULL,
--   `contact_info` varchar(100) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `enterprises`
-- --

-- LOCK TABLES `enterprises` WRITE;
-- /*!40000 ALTER TABLE `enterprises` DISABLE KEYS */;
-- INSERT INTO `enterprises` VALUES (1,'Acme Corp','Pune','1234567890'),(2,'Birla Group','Pune','8765678654'),(3,'Tata Group','Mumbai','9876677888');
-- /*!40000 ALTER TABLE `enterprises` ENABLE KEYS */;
-- UNLOCK TABLES;

-- --
-- -- Table structure for table `products`
-- --

-- DROP TABLE IF EXISTS `products`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `products` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(100) DEFAULT NULL,
--   `sku` varchar(50) DEFAULT NULL,
--   `price` decimal(10,2) DEFAULT NULL,
--   `category` varchar(100) DEFAULT NULL,
--   `status` varchar(50) DEFAULT NULL,
--   `enterprise_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `enterprise_id` (`enterprise_id`),
--   CONSTRAINT `products_ibfk_1` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `products`
-- --

-- LOCK TABLES `products` WRITE;
-- /*!40000 ALTER TABLE `products` DISABLE KEYS */;
-- INSERT INTO `products` VALUES (1,'Laptop','LP001',55000.00,'Electronics','Active',1),(2,'Croma Electronics','CE003',23000.00,'Electronics','Active',2),(3,'Voltas Appliances','VA881',6700.00,'Electronics','Active',3);
-- /*!40000 ALTER TABLE `products` ENABLE KEYS */;
-- UNLOCK TABLES;

-- --
-- -- Table structure for table `role_permissions`
-- --

-- DROP TABLE IF EXISTS `role_permissions`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `role_permissions` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `role_id` int DEFAULT NULL,
--   `module_name` varchar(50) DEFAULT NULL,
--   `can_create` tinyint(1) DEFAULT '0',
--   `can_read` tinyint(1) DEFAULT '0',
--   `can_update` tinyint(1) DEFAULT '0',
--   `can_delete` tinyint(1) DEFAULT '0',
--   PRIMARY KEY (`id`),
--   KEY `role_id` (`role_id`),
--   CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
-- ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `role_permissions`
-- --

-- LOCK TABLES `role_permissions` WRITE;
-- /*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
-- INSERT INTO `role_permissions` VALUES (2,1,'enterprise',1,1,1,1),(3,1,'employee',1,1,1,1),(4,1,'product',1,1,1,1),(5,2,'employee',0,2,0,0),(6,3,'employee',3,3,3,3);
-- /*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
-- UNLOCK TABLES;

-- --
-- -- Table structure for table `roles`
-- --

-- DROP TABLE IF EXISTS `roles`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `roles` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(50) NOT NULL,
--   `description` varchar(255) DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `name` (`name`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `roles`
-- --

-- LOCK TABLES `roles` WRITE;
-- /*!40000 ALTER TABLE `roles` DISABLE KEYS */;
-- INSERT INTO `roles` VALUES (1,'Admin','Full access'),(2,'Manager','Moderate access'),(3,'HR','Moderate access');
-- /*!40000 ALTER TABLE `roles` ENABLE KEYS */;
-- UNLOCK TABLES;

-- --
-- -- Table structure for table `users`
-- --

-- DROP TABLE IF EXISTS `users`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `users` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `name` varchar(100) DEFAULT NULL,
--   `email` varchar(100) DEFAULT NULL,
--   `password` varchar(255) DEFAULT NULL,
--   `role_id` int DEFAULT NULL,
--   `enterprise_id` int DEFAULT NULL,
--   `is_locked` tinyint(1) DEFAULT '0',
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `email` (`email`),
--   KEY `role_id` (`role_id`),
--   KEY `enterprise_id` (`enterprise_id`),
--   CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
--   CONSTRAINT `users_ibfk_2` FOREIGN KEY (`enterprise_id`) REFERENCES `enterprises` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `users`
-- --

-- LOCK TABLES `users` WRITE;
-- /*!40000 ALTER TABLE `users` DISABLE KEYS */;
-- INSERT INTO `users` VALUES (1,'Administrator','admin@example.com','$2b$10$jcFx2Qvk2bE4f/xdCmOlfemAL/PyDQBqTZeN1K990Z85XvYU5MK3O',1,NULL,0);
-- /*!40000 ALTER TABLE `users` ENABLE KEYS */;
-- UNLOCK TABLES;
-- /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -- Dump completed on 2025-10-27 14:04:10
