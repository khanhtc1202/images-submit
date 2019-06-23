FROM python:3-slim
WORKDIR /app
COPY ./ /app/
RUN apt-get update && apt-get install -y libmagickwand-dev
RUN pip install -r requirements.txt
