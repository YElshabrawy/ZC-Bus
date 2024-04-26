import requests

def create_one_bus():
    token_url = 'http://127.0.0.1:8000/user/token/'
    # Data for obtaining the token
    token_data = {
        'email': 'eman@zewailcity.edu.eg',
        'password': 'Ahme^&*$#373811'
    }
    token_response = requests.post(token_url, data=token_data)
    print("Getting token")
    if token_response.status_code == 200:
        token = token_response.json().get('access')
        print("Token: ", token)
        print("Trying to post new bus route")
        bus_route_url = 'http://127.0.0.1:8000/bus/bus-route/'
        bus_route_data = {
            'route_name': 'Zamalek',
            'driver': 'driver@zewailcity.edu.eg'
        }
        headers = {'Authorization': f'Token {token}'}

        # Sending POST request to create a bus route
        create_bus_route_response = requests.post(bus_route_url, data=bus_route_data, headers=headers)

        # Check if the request was successful
        if create_bus_route_response.status_code == 201:
            print("Bus route created successfully!")
            print("Bus route details:", create_bus_route_response.content)
        else:
            print("Failed to create the bus route. Error:", create_bus_route_response.content)
    else:
        print("Failed to get the token Error:", token_response.content)





def list_all_bus_routes():
    token_url = 'http://127.0.0.1:8000/user/token/'
    # Data for obtaining the token
    token_data = {
        'email': 'eman@zewailcity.edu.eg',
        'password': 'Ahme^&*$#373811'
    }
    token_response = requests.post(token_url, data=token_data)
    if token_response.status_code == 200:
        token = token_response.json().get('access')
        print("Token: ", token)
        print("Trying to get information of all buses")
        user_data_url = 'http://127.0.0.1:8000/bus/bus-route/'
        headers = {'Authorization': f'Token {token}'}
        get_all_buses_details = requests.get(user_data_url, headers=headers)
        if get_all_buses_details.status_code == 200:
            print("User data retieved successfully!", get_all_buses_details.json() )
        else:
            print("Failed to get the user. Error:", get_all_buses_details.reason)


import requests

def retrieve_bus_route(route_id):
    token_url = 'http://127.0.0.1:8000/user/token/'
    # Data for obtaining the token
    token_data = {
        'email': 'ahmed@zewailcity.edu.eg',
        'password': 'Ahme^&*$#373811'
    }
    token_response = requests.post(token_url, data=token_data)
    if token_response.status_code == 200:
        token = token_response.json().get('access')
        print("Token:", token)
        print("Trying to get information of bus route with ID:", route_id)
        bus_route_url = f'http://127.0.0.1:8000/bus/bus-route/{route_id}/'
        headers = {'Authorization': f'Token {token}'}
        get_bus_route_details = requests.get(bus_route_url, headers=headers)
        if get_bus_route_details.status_code == 200:
            print("Bus route data retrieved successfully!")
            print("Bus route details:", get_bus_route_details.json())
        else:
            print("Failed to get the bus route. Error:", get_bus_route_details.reason)
    else:
        print("Failed to obtain token. Error:", token_response.reason)

import requests

def update_bus_route():
    route_id = 7
    token_url = 'http://127.0.0.1:8000/user/token/'
    # Data for obtaining the token
    token_data = {
        'email': 'eman@zewailcity.edu.eg',
        'password': 'Ahme^&*$#373811'
    }
    token_response = requests.post(token_url, data=token_data)
    if token_response.status_code == 200:
        token = token_response.json().get('access')
        print("Token:", token)
        print("Trying to update information of bus route with ID:", route_id)
        bus_route_url = f'http://127.0.0.1:8000/bus/bus-route/{route_id}/'
        headers = {'Authorization': f'Token {token}'}
        
        # Data for updating the bus route (only route_name is being updated)
        update_data = { # must send both
            'route_name': 'Ramses',
            'driver': 'driver@zewailcity.edu.eg'
            }

        update_bus_route_response = requests.put(bus_route_url, data=update_data, headers=headers)
        if update_bus_route_response.status_code == 200:
            print("Bus route data updated successfully!")
            print("Updated bus route details:", update_bus_route_response.json())
        else:
            print("Failed to update the bus route. Error:", update_bus_route_response.content)
    else:
        print("Failed to obtain token. Error:", token_response.content)

import requests

def delete_bus_route():
    route_id = 7
    token_url = 'http://127.0.0.1:8000/user/token/'
    # Data for obtaining the token
    token_data = {
        'email': 'eman@zewailcity.edu.eg',
        'password': 'Ahme^&*$#373811'
    }
    token_response = requests.post(token_url, data=token_data)
    if token_response.status_code == 200:
        token = token_response.json().get('access')
        print("Token:", token)
        print("Trying to delete bus route with ID:", route_id)
        bus_route_url = f'http://127.0.0.1:8000/bus/bus-route-del/{route_id}/'
        headers = {'Authorization': f'Token {token}'}

        # Send DELETE request to delete the bus route
        delete_bus_route_response = requests.delete(bus_route_url, headers=headers)
        if delete_bus_route_response.status_code == 204:
            print("Bus route deleted successfully!")
        else:
            print("Failed to delete the bus route. Error:", delete_bus_route_response.content)
    else:
        print("Failed to obtain token. Error:", token_response.content)

# Example usage: Delete bus route with ID 2
delete_bus_route()


# Example usage: Update route_name of bus route with ID 2 to "Tahrir"
# update_bus_route()


# Example usage: Retrieve information about bus route with ID 1
# retrieve_bus_route(7)


# create_one_bus()