# Use the official Apache base image
FROM httpd:latest

# Copy the website source code to the Apache document root
COPY . /usr/local/apache2/htdocs/

# Expose port 80 for HTTP traffic
EXPOSE 80