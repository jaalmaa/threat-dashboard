FROM python:3.8.0

WORKDIR /usr/src/analytics

RUN apt update && apt install 

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "main.py" ]