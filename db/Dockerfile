FROM postgres:14-bookworm
ENV POSTGRES_DB=kemfri_database
COPY ./init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432

