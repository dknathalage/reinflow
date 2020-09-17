import networkx as nx
import osmnx as ox
import math
import requests


class Route():
    @staticmethod
    def clear_route(point1lon: float, point1lat: float, point2lon: float, point2lat: float):
        
        # center point of the map
        center_lat, center_lon = (point1lat + point2lat) / 2, (point1lon + point2lon) / 2

        # size of the map
        dist = math.sqrt((point1lat - point2lat)**2 + (point1lon-point2lon)**2) * 100000
    
        # fetch maps
        G = ox.graph_from_point(
            (center_lon, center_lat), dist=dist, dist_type='network', network_type='drive')
        
        # point 1 nearest node
        p1_nearest = ox.get_nearest_node(G, (point1lon, point1lat)) 

        # point 2 nearest node
        p2_nearest = ox.get_nearest_node(G, (point2lon, point2lat))

        # generate route
        route = ox.shortest_path(G, p1_nearest, p2_nearest, weight='length')

        # visualise route
        fig, ax = ox.plot_graph_route(G, route, route_color='r', route_linewidth=6)


rout = Route()
rout.clear_route(-37.8549, 145.1137, -37.96797, 145.19594)
