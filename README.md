# Proxy Server

This is a Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: 6 hours

Completed:

* [x] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [x] Required: Requests/reponses are proxied to/from the destination server
* [x] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [x] Required: The destination server is configurable via the `x-destination-url` header
* [x] Required: Client requests and respones are printed to stdout
* [x] Required: The `--log` argument outputs all logs to the file specified instead of stdout
* [ ] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program
* [ ] Optional: The `--loglevel` argument sets the logging chattiness
* [x] Optional: Supports HTTPS
* [x] Optional: `-h` argument prints CLI API

Walkthrough Gif:
![Video Walkthrough](https://github.com/Corsad/preworkshop-proxyserver/blob/master/walkthrough.gif?raw=true)

## Starting the Server

```bash
npm start

> prework@1.0.0 start /home/corsad/Project/Node/prework
> nodemon index.js

[nodemon] 1.10.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
```

## Features

### Echo Server:

```bash
curl -k -v https://127.0.0.1:8000 -d "This is node Preworkshop"

* Rebuilt URL to: https://127.0.0.1:8000/
*   Trying 127.0.0.1...
* Connected to 127.0.0.1 (127.0.0.1) port 8000 (#0)
* found 173 certificates in /etc/ssl/certs/ca-certificates.crt
* found 697 certificates in /etc/ssl/certs
* ALPN, offering http/1.1
* SSL connection using TLS1.2 / ECDHE_RSA_AES_128_GCM_SHA256
* 	 server certificate verification SKIPPED
* 	 server certificate status verification SKIPPED
* error fetching CN from cert:The requested data were not available.
* 	 common name:  (does not match '127.0.0.1')
* 	 server certificate expiration date OK
* 	 server certificate activation date OK
* 	 certificate public key: RSA
* 	 certificate version: #1
* 	 subject: C=VN,ST=Ho-Chi-Minh,L=city,O=coderschool,EMAIL=dang.kim.khanh93@protonmail.com
* 	 start date: Thu, 29 Sep 2016 19:26:55 GMT
* 	 expire date: Sun, 14 Feb 2044 19:26:55 GMT
* 	 issuer: C=VN,ST=Ho-Chi-Minh,L=city,O=coderschool,EMAIL=dang.kim.khanh93@protonmail.com
* 	 compression: NULL
* ALPN, server accepted to use http/1.1
> POST / HTTP/1.1
> Host: 127.0.0.1:8000
> User-Agent: curl/7.43.0
> Accept: */*
> Content-Length: 24
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 24 out of 24 bytes
< HTTP/1.1 200 OK
< host: 127.0.0.1:8000
< user-agent: curl/7.43.0
< accept: */*
< content-length: 24
< content-type: application/x-www-form-urlencoded
< Date: Fri, 30 Sep 2016 13:19:14 GMT
< Connection: keep-alive
< 
* Connection #0 to host 127.0.0.1 left intact
This is node Preworkshop%   
```

### Proxy Server:

Port 8001 will proxy to the echo server on port 8000.

```bash
curl -k -v https://127.0.0.1:8001 -d "This is node Preworkshop"

* Rebuilt URL to: https://127.0.0.1:8001/
*   Trying 127.0.0.1...
* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
* found 173 certificates in /etc/ssl/certs/ca-certificates.crt
* found 697 certificates in /etc/ssl/certs
* ALPN, offering http/1.1
* SSL connection using TLS1.2 / ECDHE_RSA_AES_128_GCM_SHA256
* 	 server certificate verification SKIPPED
* 	 server certificate status verification SKIPPED
* error fetching CN from cert:The requested data were not available.
* 	 common name:  (does not match '127.0.0.1')
* 	 server certificate expiration date OK
* 	 server certificate activation date OK
* 	 certificate public key: RSA
* 	 certificate version: #1
* 	 subject: C=VN,ST=Ho-Chi-Minh,L=city,O=coderschool,EMAIL=dang.kim.khanh93@protonmail.com
* 	 start date: Thu, 29 Sep 2016 19:26:55 GMT
* 	 expire date: Sun, 14 Feb 2044 19:26:55 GMT
* 	 issuer: C=VN,ST=Ho-Chi-Minh,L=city,O=coderschool,EMAIL=dang.kim.khanh93@protonmail.com
* 	 compression: NULL
* ALPN, server accepted to use http/1.1
> POST / HTTP/1.1
> Host: 127.0.0.1:8001
> User-Agent: curl/7.43.0
> Accept: */*
> Content-Length: 24
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 24 out of 24 bytes
< HTTP/1.1 200 OK
< host: 127.0.0.1:8001
< user-agent: curl/7.43.0
< accept: */*
< content-length: 24
< content-type: application/x-www-form-urlencoded
< connection: close
< date: Fri, 30 Sep 2016 13:19:51 GMT
< 
* Closing connection 0
This is node Preworkshop% 
```

### Configuration:

#### CLI Arguments:

The following CLI arguments are supported:

##### `--host`

The host of the destination server. Defaults to `127.0.0.1`.

##### `--port`

The port of the destination server. Defaults to `80` or `8000` when a host is not specified.

##### `--url`

A single url that overrides the above. E.g., `http://www.google.com`

##### `--log`

Print a log to a file

##### `--help`

Show Help

#### Headers

The follow http header(s) are supported:

_ https

##### `x-destination-url`

Specify the destination url on a per request basis. Overrides and follows the same format as the `--url` argument
