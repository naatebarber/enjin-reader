from typing import TypedDict
from tornado.web import Application
from enjin.handlers.base import BaseHandler, ForumsHandler, PostsHandler, ThreadsHandler
from enjin.db import DB

class Config(TypedDict):
    sqlite_path: str
    uipath: str

class App:
    def __init__(self, config: Config):
        self.sqlite_path = config.get("sqlite_path")
        self.uipath = config.get("uipath")
        self.db = DB(self.sqlite_path)

        self.singleton = {
            "db": self.db
        }

    def make_app(self):
        return Application([
            (r"/forums", ForumsHandler, {"singleton": self.singleton}),
            (r"/threads/([^/]+)", ThreadsHandler, {"singleton": self.singleton}),
            (r"/posts/([^/]+)", PostsHandler, {"singleton": self.singleton}),
        ], static_path=self.uipath)
    