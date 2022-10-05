FROM golang:1.18-bullseye

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go build -o backend .
CMD ["/app/backend"]