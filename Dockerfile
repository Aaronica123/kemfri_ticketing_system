FROM elestio/minio:latest
EXPOSE 9000
EXPOSE 90001
CMD ["server" "/data" "--console-address" ":9001"]