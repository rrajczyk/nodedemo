SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodedemo`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE IF NOT EXISTS `ads` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `user_id` bigint(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_expired` datetime DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lon` float DEFAULT NULL,
  `upload_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT '1',
  `deleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ads_user` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `title`, `description`, `user_id`, `date_created`, `date_start`, `date_expired`, `phone`, `address`, `price`, `lat`, `lon`, `upload_id`, `file_name`, `is_active`, `deleted`) VALUES
(1, 'Programmer for hire', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, '2019-12-18 00:00:00', '2019-12-18 00:00:00', '2020-01-31 00:00:00', '555-224-754', 'Los Angeles', 100, 1, 1, 1, 'ads/ad1.jpg', 0, 1),
(2, 'Alienware Laptop', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 100, NULL, NULL, 2, 'ads/ad2.jpg', 1, 0),
(3, 'New Office in NY', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 100, NULL, NULL, 3, 'ads/ad3.jpg', 1, 0),
(4, 'New Office in AZ', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 100, NULL, NULL, 4, 'ads/ad4.jpg', 1, 0),
(5, 'Lenovo Laptop', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 200, NULL, NULL, 5, 'ads/ad5.jpg', 1, 0),
(6, 'Stormtrooper', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 500, NULL, NULL, 2, 'ads/ad2.jpg', 1, 0),
(7, 'Baby Yoda', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 1000, NULL, NULL, 3, 'ads/ad3.jpg', 1, 0),
(8, 'JSON', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 100, NULL, NULL, 4, 'ads/ad4.jpg', 1, 0),
(9, 'Kamehameha', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, NULL, NULL, NULL, '555-224-754', 'Los Angeles', 100, NULL, NULL, 5, 'ads/ad5.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE IF NOT EXISTS `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mime` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `orderliness` int(11) DEFAULT '1',
  `is_improper` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_uploads_id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `name`, `mime`, `date_updated`, `file_name`, `orderliness`, `is_improper`) VALUES
(1, 'ad1.jpg', 'image/jpeg', '2020-01-01 00:00:00', 'ads/ad1.jpg', 1, 0),
(2, 'ad2.jpg', 'image/jpeg', '2020-01-01 00:00:00', 'ads/ad2.jpg', 1, 0),
(3, 'ad3.jpg', 'image/jpeg', '2020-01-01 00:00:00', 'ads/ad3.jpg', 1, 0),
(4, 'ad4.jpg', 'image/jpeg', '2020-01-01 00:00:00', 'ads/ad4.jpg', 1, 0),
(5, 'ad5.jpg', 'image/jpeg', '2020-01-01 00:00:00', 'ads/ad5.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `avatar_image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `salt` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `pass` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` tinyint(11) DEFAULT NULL,
  `locked` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fk_user_id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `description`, `avatar_image`, `salt`, `pass`, `hash`, `email`, `is_active`, `locked`) VALUES
(1, 'Admin', NULL, NULL, 'a', 'a', 'a', 'admin@gmail.com', 1, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `FK_ads_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
