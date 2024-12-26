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
                { label: "Start", notification: "START_BUTTON_CLICKED" },
                { label: "Stop", notification: "STOP_BUTTON_CLICKED" },
                    ],
            },
     },
``` 


