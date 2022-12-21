FROM ubuntu:latest
LABEL maintainer="Kartik Chadha"
LABEL version="1.0"

# Install Node dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    node \
    nodejs \
    npm \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

