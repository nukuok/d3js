import numpy as np
import numpy.matlib as matlib

from part00_recommend import RecomRelated
from urllib.parse import parse_qs


# def username_generator():
#     suffix = 'さん'
#     for c1 in 'abcdefghijklmnopqrstuvwxyz':
#         for c2 in 'abcdefghijklmnopqrstuvwxyz':
#             for c3 in 'abcdefghijklmnopqrstuvwxyz':
#                 yield c1 + c2 + c3 + suffix


def username_generator():
    prefix = 'u_'
    suffix = 'さん'
    for ii in range(100):
        yield prefix + ('%03d' % ii) + suffix


# def restname_generator():
#     uname = 'r_'
#     for c1 in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
#         for c2 in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
#                 yield uname + c1 + c2


def restname_generator():
    catenames = ["四川料理", "広東料理", "北京料理", "上海料理", "台湾料理",
        "北海道料理", "沖縄料理", "インドネシア料理", "ベトナム料理", "インド料理",
        "ネパール料理", "トルコ料理", "メキシコ料理", "シンガポール料理", "マレーシア料理",
        "韓国料理", "タイ料理", "イタリア料理", "フランス料理", "スペイン料理"]

    for name in catenames:
        yield name


class DataSet(RecomRelated):
    def __init__(self):
        self.unum = 40  # maxinum 26 * 26 * 26
        self.rnum = 20  # maxinum 20
        RecomRelated.__init__(self, self.unum, self.rnum)
        unames = username_generator()
        rnames = restname_generator()
        self.uid_list = [next(unames) for ii in range(self.unum)]
        self.rid_list = [next(rnames) for ii in range(self.rnum)]

    def get_data_set(self):
        data_set = []
        for ii in range(self.unum):
            data_set.append(self.get_user_info(ii))

        return data_set

    def random_user(self):
        return np.random.randint(self.unum)

    def recommend_for_all_user(self, recommend_num):
        user_norm = np.linalg.norm(self.data_matrix, axis=1)
        norm_matrix = np.matrix(matlib.repmat(user_norm, self.rnum, 1).T)
        normalized_matrix = self.data_matrix / norm_matrix
        # [OK] all norm = 1, np.min(np.linalg.norm(rr.recommend_for_user(1), axis=1))
        # return normalized_matrix
        similiarities = normalized_matrix * normalized_matrix.T
        recommend_result = np.argsort(similiarities)[:, -2:-recommend_num - 2:-1]
        sim_result = np.vstack(similiarities[recommend_result[ii], ii] for ii in range(self.unum))
        self.similiarities = similiarities
        return [recommend_result.tolist(), sim_result.tolist()]


class Application(object):
    def __init__(self):
        # self.path = '/user-vector'
        self.backend = DataSet()
        self.backend.generate_random_data(2400)
        self.backend.generate_centralized_data(200)

    def response(self, start_response, body):
        start_response("200 OK", [('Content-type', 'application/json; charset=UTF-8'),
                                  ('Access-Control-Allow-Origin', 'null'),
                                  ('Content-Length', str(len(body)))])
        return [body]

    # def response_html(self, start_response, body):
    #     start_response("200 OK", [('Content-type', 'text/html; charset=UTF-8'),
    #                               ('Access-Control-Allow-Origin', 'null'),
    #                               ('Content-Length', str(len(body)))])
    #     return [body]

    def __call__(self, environ, start_response):

        raw_uid = parse_qs(environ['QUERY_STRING']).get('uid')
        if raw_uid:
            uid = int(raw_uid[0])
        # uid = 8
        # self.backend.generate_random_data(1000)

        path = environ['PATH_INFO']
        if path == '/user-names':
            body = str(self.backend.uid_list).replace("'", '"').encode()
            return self.response(start_response, body)

        if path == '/restaurant-names':
            body = str(self.backend.rid_list).replace("'", '"').encode()
            return self.response(start_response, body)

        if path == '/data-set':
            body = str(self.backend.data_matrix.tolist()).encode()
            return self.response(start_response, body)

        if path == '/recommend':
            body = str(self.backend.recommend_for_user(uid, 5).tolist()).encode()
            return self.response(start_response, body)

        if path == '/recommend-for-all':
            body = str(self.backend.recommend_for_all_user(5)).encode()
            return self.response(start_response, body)

        # if path == '/':
        #     index_page = 'www/index.html'
        #     with open(index_page, 'r') as fid:
        #         raw_body = fid.read()
        #         body = raw_body.encode()
        #         return self.response_html(start_response, body)
