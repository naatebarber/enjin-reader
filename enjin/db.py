import sqlite3


class DB:
    def __init__(self, sqlite_path: str):
        self.path = sqlite_path
        self.con = sqlite3.connect(self.path)
        self.cur = self.con.cursor()
        print("DB CONNECTED!")

    def get_forums(self):
        query = "SELECT * FROM forums"

        try:
            self.cur.execute(query)
            rows = self.cur.fetchall()
            # Fetch the column names
            columns = [description[0] for description in self.cur.description]

            # Convert the rows to a list of dictionaries
            forums_list = []
            for row in rows:
                forum_dict = dict(zip(columns, row))
                forums_list.append(forum_dict)

            return forums_list

        except sqlite3.Error as e:
            print(f"SQLite error: {e}")

    def get_threads_by_forum_id(self, forum_id: str):
        query = "SELECT * FROM threads WHERE forum_id = ?"

        try:
            self.cur.execute(query, (forum_id,))
            rows = self.cur.fetchall()
            columns = [description[0] for description in self.cur.description]
            threads_list = [dict(zip(columns, row)) for row in rows]
            return threads_list
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")

    def get_posts_by_thread_id(self, thread_id: str):
        query = "SELECT * FROM posts WHERE thread_id = ?"
        try:
            self.cur.execute(query, (thread_id,))
            rows = self.cur.fetchall()
            columns = [description[0] for description in self.cur.description]
            posts_list = [dict(zip(columns, row)) for row in rows]
            return posts_list
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")

    def close(self):
        self.con.close()
