# Libranote

Libre software to manage different aspects of school life.

Test data are in French, because Libranote has been designed for the French system.

We use Preact for the web client, and JSON-server as a temporary back-end. But we started working on a
real REST API using Django and the Django REST framework.

If you want to contribute, you're welcome!

To run it, just do:

```
### Setup: just run it once ###
npm i

cd libranote
pipenv --three
pipenv shell
pipenv install
###

# Run Webpack (run it in the root directory)
npm run build

# Start the server
cd libranote
python manage.py migrate
python manage.py runserver
```

And go on [0.0.0.0:8000](http://0.0.0.0:8000).

You should probably use the Django Admin to add some test data,
since it's not possible to initialize the app through the web client yet.
