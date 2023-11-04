import asyncio
import os
from tornado.ioloop import IOLoop

from enjin.app import App, Config


if __name__ == "__main__":
    config: Config = {
        "sqlite_path": os.environ.get("SQLITE"),
        "uipath": os.environ.get("UIPATH")
    }

    print(config)

    app = App(config=config).make_app()
    print("App listening on http://localhost:8080/")
    app.listen(8080)
    IOLoop.current().start()
    