import data00_user_vector

# DEBUG = 1

# def debug(*args):
#     if DEBUG = 1:
#         print(*args)

class EmptyApp(object):
    def __init__(self):
        pass

    def __call__(self, environ, start_response):
        start_response("200 OK",[])
        return [b'']


class IndexApp(object):
    def __init__(self):
        pass

    def __call__(self, environ, start_response):
        filename = "index.html"
        with open(filename, 'r') as fid:
            body = fid.read()
        bbody = body.encode()
        start_response("200 OK", [('Content-Type', 'html'),
                                  ('Content-Length', str(len(bbody)))])
        return [bbody]


class RootApp(object):
    def __init__(self, dic={}):
        self.route_dict = dic

    def update_path_route(self, path_info, application):
        self.route_dict[path_info] = application

    def __call__(self, environ, start_response):
        path_info = environ['PATH_INFO']
        app = self.route_dict.get(path_info)
        return app(environ, start_response)

application = RootApp()
recommend_application = data00_user_vector.Application()

application.update_path_route("/", IndexApp())
application.update_path_route("/favicon.ico", EmptyApp())
application.update_path_route("/user-names", recommend_application)
application.update_path_route("/restaurant-names", recommend_application)
application.update_path_route("/data-set", recommend_application)
application.update_path_route("/recommend", recommend_application)
application.update_path_route("/recommend-for-all", recommend_application)
application.update_path_route("/", recommend_application)

if __name__ == '__main__':
    from wsgiref.simple_server import make_server

    port = 8888
    server = make_server('', port, application)
    print("Serving on port %d" % port)
    server.serve_forever()
