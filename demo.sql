-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:8889
-- 產生時間： 2022 年 01 月 24 日 08:14
-- 伺服器版本： 5.7.34
-- PHP 版本： 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `demo`
--

-- --------------------------------------------------------

--
-- 資料表結構 `buy`
--

CREATE TABLE `buy` (
  `userID` int(4) NOT NULL,
  `productID` int(4) NOT NULL,
  `productPrice` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `nation`
--

CREATE TABLE `nation` (
  `nationID` int(2) NOT NULL,
  `nationName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `nation`
--

INSERT INTO `nation` (`nationID`, `nationName`) VALUES
(1, '韓國'),
(2, '二次元'),
(3, '日本'),
(4, '英國'),
(5, '中國'),
(6, '台灣');

-- --------------------------------------------------------

--
-- 資料表結構 `picture`
--

CREATE TABLE `picture` (
  `productID` int(4) NOT NULL,
  `pictureAddress1` text NOT NULL,
  `pictureAddress2` text NOT NULL,
  `pictureAddress3` text NOT NULL,
  `pictureAddress4` text NOT NULL,
  `pictureAddress5` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `productID` int(4) NOT NULL,
  `productClass` int(3) NOT NULL,
  `productName` text NOT NULL,
  `productPrice` int(5) NOT NULL,
  `nationID` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `userID` int(4) NOT NULL,
  `userName` text NOT NULL,
  `userPhone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `buy`
--
ALTER TABLE `buy`
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `productPrice` (`productPrice`);

--
-- 資料表索引 `nation`
--
ALTER TABLE `nation`
  ADD PRIMARY KEY (`nationID`);

--
-- 資料表索引 `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `productID` (`productID`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `productPrice` (`productPrice`),
  ADD KEY `nationID` (`nationID`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `userID` (`userID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `nation`
--
ALTER TABLE `nation`
  MODIFY `nationID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `picture`
--
ALTER TABLE `picture`
  MODIFY `productID` int(4) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `productID` int(4) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(4) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `buy`
--
ALTER TABLE `buy`
  ADD CONSTRAINT `buy_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `buy_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`),
  ADD CONSTRAINT `buy_ibfk_3` FOREIGN KEY (`productPrice`) REFERENCES `product` (`productPrice`);

--
-- 資料表的限制式 `picture`
--
ALTER TABLE `picture`
  ADD CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`);

--
-- 資料表的限制式 `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`nationID`) REFERENCES `nation` (`nationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
