# MMM-ButtonNotifier
Simple Module to create an onscreen Button to send notifications for Magic Mirror Modules

## Config
Add to config.js 

```js
   modules: [
    {
        module: "MMM-ButtonNotifier",
        position: "top_left", // Place the hamburger menu where you want
        config: {
            menuLabel: "Menu", // Optional customization for future menu labels
            buttons: [
                {
                    label: "Notify All",
                    notification: "NOTIFY_ALL",
                    targetModule: null,
                    payload: { message: "Hello, world!" },
                },
                {
                    label: "Start Timer",
                    notification: "TIMER_START",
                    targetModule: "MMM-Timer",
                    payload: { duration: 60 },
                },
                {
                    label: "Stop Timer",
                    notification: "TIMER_STOP",
                    targetModule: "MMM-Timer",
                    payload: null,
                },
            ],
        },
    },
];

``` 


