#!/bin/bash

python manage.py makemigrations app
python manage.py migrate
python manage.py runserver -v 0 0.0.0.0:8989