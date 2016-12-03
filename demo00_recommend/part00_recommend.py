import numpy as np
import numpy.matlib as matlib


class RecomRelated(object):
    def __init__(self, USER_NUM=5000, RESTAURANT_NUM=100):
        random_matrix = np.floor(np.random.rand(USER_NUM, RESTAURANT_NUM) * 10).astype(np.uint8)
        random_matrix[random_matrix > 3] = 0
        self.data_matrix = np.matrix(random_matrix.reshape(USER_NUM, RESTAURANT_NUM))
        self.unum = USER_NUM
        self.rnum = RESTAURANT_NUM
        self.similiarity = []

    def generate_random_data(self, num):
        rand_user = np.floor(np.random.rand(num) * self.unum).astype(np.uint8)
        rand_restaurant = np.floor(np.random.rand(num) * self.rnum).astype(np.uint8)

        # [BUG] only increase 1 when index duplicated
        # self.data_matrix[rand_user, rand_restaurant] += 1

        for ii in range(num):
            self.data_matrix[rand_user[ii], rand_restaurant[ii]] += 1

    def generate_centralized_data(self, num):
        rand_user = np.floor(np.random.rand(num) * self.unum).astype(np.uint8)
        rand_restaurant = [min(self.rnum - 1,
                               max(0,
                                   np.int(np.random.normal(uid % self.rnum,
                                                           max(1, uid // self.rnum)))))
                           for uid in rand_user]

        for ii in range(num):
            self.data_matrix[rand_user[ii], rand_restaurant[ii]] += 1

    def get_user_info(self, id):
        return self.data_matrix[id, :]

    def get_user_info_in_rate(self, id):
        data_vector = self.data_matrix[id, :]
        return data_vector / np.linalg.norm(data_vector)

    def recommend_for_user(self, id, recommend_num):
        user_norm = np.linalg.norm(self.data_matrix, axis=1)
        norm_matrix = np.matrix(matlib.repmat(user_norm, self.rnum, 1).T)
        normalized_matrix = self.data_matrix / norm_matrix
        # [OK] all norm = 1, np.min(np.linalg.norm(rr.recommend_for_user(1), axis=1))
        # return normalized_matrix
        similiarity = normalized_matrix * normalized_matrix[id, :].T
        recommend_result = np.argsort(similiarity.A1)[:-recommend_num - 1:-1]
        self.similiarity = similiarity
        return recommend_result

if __name__ == '__main__':
    rr = RecomRelated()
