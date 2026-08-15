FROM redis:8.8-trixie
EXPOSE 6379
# Switch to the root user for setup
USER root
# Ensure the data directory is owned by the redis user
RUN mkdir -p /data && chown -R redis:redis /data
# Switch back to the redis user for running the process
USER redis

