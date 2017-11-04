#!/bin/bash

NODE_ENV=production pm2 start app.js --name="api.hms"
