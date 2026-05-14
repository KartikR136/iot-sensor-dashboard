#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define WIFI_SSID "Airtel_XYZ"
#define WIFI_PASSWORD "mypassword123"

#define MQTT_BROKER "broker.hivemq.com"
#define MQTT_PORT 1883
#define MQTT_TOPIC "iot/demo/sensor-data"

#define DHT_PIN 4
#define DHT_TYPE DHT22

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
DHT dht(DHT_PIN, DHT_TYPE);

unsigned long lastPublishTime = 0;
const unsigned long publishInterval = 5000;

const char* deviceId = "esp32-room-01";

void connectToWiFi() {
  Serial.print("Connecting to WiFi");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.println(WiFi.localIP());
}

void connectToMQTT() {
  while (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT broker...");

    String clientId = "ESP32Client-";
    clientId += String(random(1000, 9999));

    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" retrying in 3 seconds");
      delay(3000);
    }
  }
}

String createPayload(float temperature, float humidity) {
  String payload = "{";
  payload += "\"deviceId\":\"";
  payload += deviceId;
  payload += "\",";
  payload += "\"temperature\":";
  payload += String(temperature, 2);
  payload += ",";
  payload += "\"humidity\":";
  payload += String(humidity, 2);
  payload += "}";

  return payload;
}

void setup() {
  Serial.begin(115200);

  dht.begin();

  connectToWiFi();

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }

  if (!mqttClient.connected()) {
    connectToMQTT();
  }

  mqttClient.loop();

  unsigned long currentTime = millis();

  if (currentTime - lastPublishTime >= publishInterval) {
    lastPublishTime = currentTime;

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor");
      return;
    }

    String payload = createPayload(temperature, humidity);

    bool published = mqttClient.publish(MQTT_TOPIC, payload.c_str());

    if (published) {
      Serial.println("Sensor data published:");
      Serial.println(payload);
    } else {
      Serial.println("MQTT publish failed");
    }
  }
}