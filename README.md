# Libranote

Libre software to manage different aspects of school life.

Test data are in French, because Libranote has been designed for the French system.

We use Preact for the web client, and JSON-server as a temporary back-end. But we started working on a
real REST API using Django and the Django REST framework.

If you want to contribute, you're welcome!

To run it, just do:

```
npm i

# Start the fake API server
npm run api

# In another terminal
npm run dev
```

And go on [0.0.0.0:8080](http://0.0.0.0:8080).

If you want to work on the server:

```
pipenv --three
pipenv shell
pipenv install

cd libranote
python manage.py migrate
python manage.py runserver
```

You should probably use the Django Admin to add some test data,
since it's not possible to initialize the app through the web client yet.
