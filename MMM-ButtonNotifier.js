## Reverting to previous code because it's not working
Module.register("MMM-ButtonNotifier", {
    // Default module configuration
    defaults: {
        buttons: [
            {
                label: "Button 1",
                notification: "BUTTON_1_CLICKED",
                targetModule: null, // Set to a specific module name or null for broadcast
                payload: { key: "value1" }, // Custom data to send with the notification
                style: "default", // Optional style
            },
            {
                label: "Button 2",
                notification: "BUTTON_2_CLICKED",
                targetModule: "TargetModuleName", // Replace with actual module name
                payload: { key: "value2" },
                style: "alternative",
            },
        ],
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-ButtonNotifier.css"];
    },

    // Generate the DOM for the module
    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "button-notifier";

        this.config.buttons.forEach((buttonConfig) => {
            const button = document.createElement("button");
            button.innerHTML = buttonConfig.label;
            button.className = `button ${buttonConfig.style || "default"}`;

            // Add touch and click event listeners
            button.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent touch conflicts
                this.handleButtonPress(buttonConfig);
            });

            button.addEventListener("click", () => {
                this.handleButtonPress(buttonConfig);
            });

            wrapper.appendChild(button);
        });

        return wrapper;
    },

    // Handle button press and send targeted notifications
    handleButtonPress: function (buttonConfig) {
        if (buttonConfig.targetModule) {
            // Send the notification to a specific module
            this.sendNotificationToModule(
                buttonConfig.targetModule,
                buttonConfig.notification,
                buttonConfig.payload
            );
        } else {
            // Broadcast the notification
            this.sendNotification(buttonConfig.notification, buttonConfig.payload);
        }
        console.log(
            `Notification sent: ${buttonConfig.notification} to ${
                buttonConfig.targetModule || "ALL modules"
            } with payload:`,
            buttonConfig.payload
        );
    },

    // Custom method to send notifications to a specific module
    sendNotificationToModule: function (moduleName, notification, payload) {
        const targetModules = MM.getModules().filter((module) => module.name === moduleName);
        targetModules.forEach((module) => {
            module.notificationReceived(notification, payload, this);
        });
    },
});
