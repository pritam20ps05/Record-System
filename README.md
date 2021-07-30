
# Record-System-Beta

This is the Beta branch of the Record-System all the new features and optimizations are first implemented and practiced here before implementing it to the main branch. Whenever a beta-release branch merges with the master branch a new version of the app is released. All the implementations in this branch are subjected to tests and changes.

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
    "uri": "<mongodb URI>",
    "password": "<dbuser password><optional>",
    "col": "<collection name>"
  }
}
```

In terminal locate to the app folder and then run the following command

```bash
python3 app.py
```
or it can be first imported then executed in a different program

NOTE: remember to rename the Record-System folder to Record_System as - has a special meaning in Python

```python
from Record_System.app import server_instance

server_instance.run(host="0.0.0.0", port=8000)
```

## Contributing
Pull requests are welcome. For any major change a pre discussion should be done in this thread or contact me

Also proper tests should be performed before and change

## License
[MIT](https://choosealicense.com/licenses/mit/)
