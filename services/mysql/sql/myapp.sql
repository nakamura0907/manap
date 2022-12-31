-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2022 年 12 月 29 日 12:13
-- サーバのバージョン： 8.0.29
-- PHP のバージョン: 8.0.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `myapp`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `chat_comments`
--

CREATE TABLE `chat_comments` (
  `id` int NOT NULL,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `chat_comments`
--

INSERT INTO `chat_comments` (`id`, `room_id`, `user_id`, `body`, `created_at`) VALUES
(1, 1, 3, 'こんにちは', '2022-12-25 23:09:26'),
(2, 1, 1, 'こんばんは', '2022-12-25 23:17:55'),
(3, 1, 3, 'さようなら', '2022-12-25 23:18:26'),
(4, 1, 3, 'オハヨウゴザイマス', '2022-12-25 23:19:44');

-- --------------------------------------------------------

--
-- テーブルの構造 `chat_rooms`
--

CREATE TABLE `chat_rooms` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `name` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `chat_rooms`
--

INSERT INTO `chat_rooms` (`id`, `project_id`, `name`, `created_at`) VALUES
(1, 2, 'general', '2022-12-23 05:16:56'),
(2, 2, 'bugfix', '2022-12-22 22:21:26');

-- --------------------------------------------------------

--
-- テーブルの構造 `feature-suggestions`
--

CREATE TABLE `feature-suggestions` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `proposer_id` int NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `vendor_approval` tinyint(1) NOT NULL DEFAULT '0',
  `client_approval` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `feature-suggestions`
--

INSERT INTO `feature-suggestions` (`id`, `project_id`, `proposer_id`, `title`, `description`, `status`, `vendor_approval`, `client_approval`) VALUES
(2, 2, 1, '機能提案機能', '', 0, 1, 1),
(3, 2, 1, 'ダッシュボード機能', '', 0, 0, 0),
(4, 1, 1, '機能提案機能', '', 0, 1, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `feature-suggestions_comments`
--

CREATE TABLE `feature-suggestions_comments` (
  `id` int NOT NULL,
  `suggestion_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `feature-suggestions_comments`
--

INSERT INTO `feature-suggestions_comments` (`id`, `suggestion_id`, `user_id`, `content`, `created_at`) VALUES
(1, 2, 1, 'こんにちは', '2022-11-29 17:18:16'),
(2, 2, 1, 'こんばんは', '2022-11-29 17:18:26');

-- --------------------------------------------------------

--
-- テーブルの構造 `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_flag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `projects`
--

INSERT INTO `projects` (`id`, `name`, `description`, `updated_at`, `delete_flag`) VALUES
(1, 'phpMyAdmin', '', '2022-11-14 19:52:31', 0),
(2, 'プロジェクト管理アプリ', '', '2022-11-21 22:01:08', 0),
(4, 'DeepL翻訳', '', '2022-11-16 00:05:17', 0),
(5, 'Reactアプリ', '', '2022-11-16 01:52:28', 1),
(6, 'Nodeアプリ', '', '2022-11-21 15:04:58', 0),
(7, '掲示板アプリ', '掲示板アプリです', '2022-12-27 21:43:53', 0),
(8, 'チャットアプリ', '', '2022-12-27 21:44:07', 0);

-- --------------------------------------------------------

--
-- テーブルの構造 `projects_members`
--

CREATE TABLE `projects_members` (
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `delete_flag` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `projects_members`
--

INSERT INTO `projects_members` (`project_id`, `user_id`, `role_id`, `delete_flag`) VALUES
(1, 1, 3, 0),
(1, 2, 1, 0),
(2, 1, 1, 0),
(2, 2, 3, 0),
(2, 3, 4, 0),
(4, 1, 2, 1),
(4, 3, 1, 0),
(5, 1, 1, 0),
(6, 1, 1, 0),
(7, 1, 1, 0),
(8, 1, 1, 0);

-- --------------------------------------------------------

--
-- テーブルの構造 `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `weight` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `roles`
--

INSERT INTO `roles` (`id`, `name`, `weight`) VALUES
(1, '管理者', 0),
(2, 'リーダー', 10),
(3, '開発者', 100),
(4, 'クライアント', 500),
(5, 'クライアントリーダー', 50);

-- --------------------------------------------------------

--
-- テーブルの構造 `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` text NOT NULL,
  `due` date NOT NULL,
  `priority` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `title`, `description`, `status`, `due`, `priority`) VALUES
(1, 2, 'タスクボード機能改', '', '未着手', '2022-12-20', '高');

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nickname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `nickname`) VALUES
(1, 'yamada'),
(2, 'nakamura0907'),
(3, 'tanaka');

-- --------------------------------------------------------

--
-- テーブルの構造 `users_auths`
--

CREATE TABLE `users_auths` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `identity_type` varchar(255) NOT NULL,
  `identifier` text NOT NULL,
  `credential` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- テーブルのデータのダンプ `users_auths`
--

INSERT INTO `users_auths` (`id`, `user_id`, `identity_type`, `identifier`, `credential`) VALUES
(1, 1, 'email', 'test@example.com', '$2b$10$tqtVOctw4hupE.l1kQVB6eRb8WAoNKD9EL3QosSCENwJ6EIMMivnW'),
(2, 2, 'github', '53244048', ''),
(3, 3, 'email', 'test2@example.com', '$2b$10$QrYheTvqNKxZftPFBFnaseXhXP6aWLAiSQOAZTEd1W0X/DB3LB3N6');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `chat_comments`
--
ALTER TABLE `chat_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_chats_comments_room_id` (`room_id`),
  ADD KEY `ref_chats_comments_user_id` (`user_id`);

--
-- テーブルのインデックス `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_chats_rooms_project_id` (`project_id`);

--
-- テーブルのインデックス `feature-suggestions`
--
ALTER TABLE `feature-suggestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_feature-suggestions_proposer_id` (`proposer_id`),
  ADD KEY `ref_feature-suggestions_project_id` (`project_id`);

--
-- テーブルのインデックス `feature-suggestions_comments`
--
ALTER TABLE `feature-suggestions_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_feature-suggestions_comments_user_id` (`user_id`),
  ADD KEY `ref_feature-suggestions_comments_suggestion_id` (`suggestion_id`) USING BTREE;

--
-- テーブルのインデックス `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `projects_members`
--
ALTER TABLE `projects_members`
  ADD UNIQUE KEY `project_id` (`project_id`,`user_id`),
  ADD KEY `ref_projects_members_user_id` (`user_id`),
  ADD KEY `ref_projects_members_role_id` (`role_id`);

--
-- テーブルのインデックス `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_tasks_project_id` (`project_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `users_auths`
--
ALTER TABLE `users_auths`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_users_auths_user_id` (`user_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `chat_comments`
--
ALTER TABLE `chat_comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルの AUTO_INCREMENT `chat_rooms`
--
ALTER TABLE `chat_rooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `feature-suggestions`
--
ALTER TABLE `feature-suggestions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- テーブルの AUTO_INCREMENT `feature-suggestions_comments`
--
ALTER TABLE `feature-suggestions_comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- テーブルの AUTO_INCREMENT `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- テーブルの AUTO_INCREMENT `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `users_auths`
--
ALTER TABLE `users_auths`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `chat_comments`
--
ALTER TABLE `chat_comments`
  ADD CONSTRAINT `ref_chats_comments_room_id` FOREIGN KEY (`room_id`) REFERENCES `chat_rooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ref_chats_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `chat_rooms`
--
ALTER TABLE `chat_rooms`
  ADD CONSTRAINT `ref_chats_rooms_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `feature-suggestions`
--
ALTER TABLE `feature-suggestions`
  ADD CONSTRAINT `ref_feature-suggestions_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ref_feature-suggestions_proposer_id` FOREIGN KEY (`proposer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `feature-suggestions_comments`
--
ALTER TABLE `feature-suggestions_comments`
  ADD CONSTRAINT `ref_feature-suggestions_comments_suggestions_id` FOREIGN KEY (`suggestion_id`) REFERENCES `feature-suggestions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `ref_feature-suggestions_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `projects_members`
--
ALTER TABLE `projects_members`
  ADD CONSTRAINT `ref_projects_members_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ref_projects_members_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ref_projects_members_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `ref_tasks_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- テーブルの制約 `users_auths`
--
ALTER TABLE `users_auths`
  ADD CONSTRAINT `ref_users_auths_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
