#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
# if MacOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  EXECUTABLE="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
else
  EXECUTABLE="google-chrome-stable"
fi

rm -f dist.crx \
  studio-ui-enhancer-extension.crx \
  studio-ui-enhancer-extension.zip \
  chrome-web-store/studio-ui-enhancer-extension.crx \
  chrome-web-store/studio-ui-enhancer-extension.zip

npm run build

(cd dist && zip -q -r -X ../chrome-web-store/studio-ui-enhancer-extension.zip . -x "*.DS_Store")
echo Generated studio-ui-enhancer-extension.zip

if [ -f "$SCRIPT_DIR/extension-private-key.pem" ]; then
  eval $EXECUTABLE --pack-extension="$SCRIPT_DIR/dist" --pack-extension-key="$SCRIPT_DIR/extension-private-key.pem"
  mv dist.crx chrome-web-store/studio-ui-enhancer-extension.crx

  echo Generated studio-ui-enhancer-extension.crx
else
  echo "No private key found, skipping crx generation"
fi
