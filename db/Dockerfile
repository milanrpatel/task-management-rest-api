FROM postgres:latest

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin123
ENV POSTGRES_DB=task_db

EXPOSE 5432

COPY init.sql /docker-entrypoint-initdb.d/

CMD ["postgres"]
