# Projeto baseado em https://motion-software.com/blog/how-to-use-mqtt-with-react-native/

# Mosquitto

## start mosquitto

$ launchctl start homebrew.mxcl.mosquitto
$ launchctl stop homebrew.mxcl.mosquitto

# Paho

## paho js docs

https://www.eclipse.org/paho/files/jsdoc/index.html

## paho mqtt js

https://github.com/rh389/react-native-paho-mqtt

# Android

## Para funcionar no android

- Ver os emuladores abertos => adb devices
- Gerar o realease build => react-native run-android --variant=release --deviceId "NNNNNN"
- Visualizar o apk => android/app/build/outputs/apk/app-release.apk

# Brokers

## Testar no Hive

http://www.hivemq.com/demos/websocket-client/

## Testar no mosquitto

mosquitto_pub -h test.mosquitto.org -t "ssc/sensor/1/porta" -m "fechada"
