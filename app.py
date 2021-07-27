""" this is the main app runner and at the time of deployment the
server_instance here can be submitted to the prefered web server """
from modules import server_instance

if __name__ == "__main__":
    server_instance.run(port="8000", debug=True)
