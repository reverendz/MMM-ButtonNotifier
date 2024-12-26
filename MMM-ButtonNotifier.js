Module.register("MMM-ButtonNotifier", {
    // Default configuration
    defaults: {
        buttons: [
            { label: "Button 1", notification: "BUTTON_1_CLICKED" },
            { label: "Button 2", notification: "BUTTON_2_CLICKED" },
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
            button.className = "button";

            // Add event listeners for touch and mouse clicks
            button.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent triggering other touch behaviors
                this.sendNotification(buttonConfig.notification, {
                    label: buttonConfig.label,
                });
            });

            button.addEventListener("click", (event) => {
                this.sendNotification(buttonConfig.notification, {
                    label: buttonConfig.label,
                });
            });

            wrapper.appendChild(button);
        });

        return wrapper;
    },

    // Handle incoming notifications (optional)
    notificationReceived: function (notification, payload, sender) {
        if (notification === "EXAMPLE_NOTIFICATION") {
            console.log("Received EXAMPLE_NOTIFICATION:", payload);
        }
    },
});
