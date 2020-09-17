import networkx as nx
import osmnx as ox
import math
import requests
import heapq
import numpy as np

class Route():
    @staticmethod
    def clear_route(point1lon: float, point1lat: float, point2lon: float, point2lat: float):

        # center point of the map
        center_lat, center_lon = (
            point1lat + point2lat) / 2, (point1lon + point2lon) / 2

        # size of the map
        dist = math.sqrt((point1lat - point2lat)**2 +
                         (point1lon-point2lon)**2) * 100000 + 300

        # fetch maps
        G = ox.graph_from_point(
            (center_lon, center_lat), dist=dist, dist_type='network', network_type='drive')

        # point 1 nearest node
        p1_nearest = ox.get_nearest_node(G, (point1lon, point1lat))

        # point 2 nearest node
        p2_nearest = ox.get_nearest_node(G, (point2lon, point2lat))

        # generate route
        route = ox.shortest_path(G, p1_nearest, p2_nearest, weight='length')

        nodelist = []  # node data of routes
        for i in route:
            # append node data to a placeholder
            nodelist.append(G.nodes()[i])

        retries = 3
        while(retries > 0):
            r = requests.post('https://reinflow-backend.vercel.app/api/user/login',
                              json={"email": "test1@test.com", "pass": "test"})  # retrieve a token from backend to retrieve traffic light data
            retries -= retries
            if r.status_code == 200:  # try 3 times before exiting the loop to login
                break

        if r.status_code != 200:  # returning on failed login
            raise Exception('Unsuccessful login')
            return

        token = r.json()['token']
        retries = 3
        while(retries > 0):
            r = requests.get('https://reinflow-backend.vercel.app/api/l3/lights', headers={'Authorization':token})
            retries -= retries

        if r.status_code != 200:  # returning on failed login
            raise Exception('Unsuccessful light location retrieval')
            return
        
        len_route_nodes = len(nodelist)

        closest_lights = np.zeros((len_route_nodes, 6, 2))
        print(closest_lights)

        # visualise route
        fig, ax = ox.plot_graph_route(
            G, route, route_color='r', route_linewidth=6)


rout = Route()
rout.clear_route(-37.8549, 145.1137, -37.85340, 145.10630)
