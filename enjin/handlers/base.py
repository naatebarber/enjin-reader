from typing import Any, Dict
from tornado.web import RequestHandler
from tornado.escape import json_encode
from enjin.db import DB


class BaseHandler(RequestHandler):
    def initialize(self, singleton):
        self.db = singleton.get("db")

    def prepare(self):
        print(f"{self.request.method} -> {self.request.path}")

    def set_default_headers(self):
        self.set_header(
            "Access-Control-Allow-Origin", "*"
        )  # WARNING: this is not recommended for production
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

    def options(self):
        # no body
        self.set_status(204)
        self.finish()


class ForumsHandler(BaseHandler):
    def get(self):
        forums = self.db.get_forums()
        self.write(json_encode(forums))


class ThreadsHandler(BaseHandler):
    def get(self, forum_id):
        threads = self.db.get_threads_by_forum_id(forum_id)
        self.write(json_encode(threads))


class PostsHandler(BaseHandler):
    def get(self, thread_id):
        posts = self.db.get_posts_by_thread_id(thread_id)
        self.write(json_encode(posts))
