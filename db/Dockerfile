FROM postgres:14-bookworm
ENV POSTGRES_DB=kemfri_database
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
EXPOSE 5432

