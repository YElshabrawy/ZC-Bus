import requests

def signpup():
    # Define the URL of your API endpoint
    url = 'http://127.0.0.1:8000/user/register/'

    # Define the data to be sent in the request body
    data = {
        'first_name': 'Ahmed',
        'last_name': 'Adel',
        'email': 'ahmed@zewailcity.edu.eg',
        'phone_number': '01116442100',
        'password': 'Ahme^&*$#373811',
        'is_driver': False,  
        'is_uni_staff': False,
        'is_zc_student': True,
    }

    # Make the POST request
    response = requests.post(url, json=data)

    # Check if the request was successful (status code 201 indicates creation)
    if response.status_code == 201:
        print("User created successfully!")
    else:
        print("Failed to create user. Error:", response.text)
        

def list_one_users():
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
        print("Trying to get information of the user")
        user_data_url = 'http://127.0.0.1:8000/user/'
        headers = {'Authorization': f'Token {token}'}
        get_user_details = requests.get(user_data_url, headers=headers)
        if get_user_details.status_code == 200:
            print("User data retieved successfully!", get_user_details.json() )
        else:
            print("Failed to get the user. Error:", get_user_details.reason)




list_one_users()