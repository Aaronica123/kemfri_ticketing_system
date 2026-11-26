FROM bitnamicharts/minio:sha256-f651556c9adf011d17e3e1646079f34906ecce43aaf73deeafa08d7a25872db4
EXPOSE 9000
EXPOSE 90001
CMD ["server" "/data" "--console-address" ":9001"]