# MMM-ButtonNotifier
Simple Module to create an onscreen Button to send notifications for Magic Mirror Modules

## Config
Add to config.js 

```js
  {
        module: "MMM-ButtonNotifier",
        position: "top_center", // Choose any position
        config: {
            buttons: [
                {
                    label: "Notify All",
                    notification: "NOTIFY_ALL",
                    targetModule: null, // Broadcast
                    payload: { message: "Hello, world!" },
                    style: "default",
                },
                {
                    label: "Notify Timer",
                    notification: "TIMER_START",
                    targetModule: "MMM-Timer", // Send only to MMM-Timer module
                    payload: { duration: 30 },
                    style: "alternative",
                },
            ],
        },
    },

``` 


