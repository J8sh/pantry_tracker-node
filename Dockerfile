FROM ubuntu:latest

# Update the package lists
RUN apt-get update

# Upgrade the installed packages
RUN apt-get upgrade -y

# Additional instructions for your application
# ...
