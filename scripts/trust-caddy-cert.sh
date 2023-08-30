#!/usr/bin/env bash
if security find-certificate -c "Caddy Local Authority" -p >> /dev/null; then
    echo 'Caddy Local Authority is trusted.'
else
    echo 'Adding Caddy Local Authority to KeyChain.'
    mkdir -p ./caddy/certificate/
    CERT_FILE=./caddy/certificate/root.crt
    docker exec geyser-caddy-standalone cat /data/caddy/pki/authorities/local/root.crt > $CERT_FILE
    security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CERT_FILE
fi;
