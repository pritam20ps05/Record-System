# Record-System

This is a web app built on flask and pymongo built to be served as a system to manage the student payment system efficiently. This project was built keeping in mind its UI responsiveness and interactiveness also lighthouse scores were also maintained. There are further plans of it even developing more to a fully automated system more secure, flexible and reliable.

## Dependencies
![](https://img.shields.io/badge/flask-v2.0.1-blue)

![](https://img.shields.io/badge/pymongo-v3.11.4-orange)

![](https://img.shields.io/badge/dnspython-v2.1.0-brightgreen)

![](https://img.shields.io/badge/app--build-v4.0.1-green)

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the dependencies mentioned in the requirements.txt

NOTE: It is better to make a separate virtual environment for this particular app. The procedure can be found [here](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/)

```bash
pip install -r requirements.txt
```

## Usage
A credentials.json file should be made in the root directory which should contain the mongodb app connect URI in the following format

```json
{
  "db": {
    "uri": <mongodb URI>,
    "password": <dbuser password><optional>
  }
}
```

In terminal locate to the app folder and then run the following command

```bash
python3 app.py
```
or it can be first imported then executed in a different program

```python
from Record-System.app import server_instance

server_instance.run(host="0.0.0.0", port=8000)
```

## Contributing
Pull requests are welcome. For any major change a pre discussion should be done in this thread or contact me

Also proper tests should be performed before and change

## License
[MIT](https://choosealicense.com/licenses/mit/)
