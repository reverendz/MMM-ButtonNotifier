Module.register("MMM-ButtonNotifier", {
    // Default module configuration
    defaults: {
        buttons: [
            {
                label: "Button 1",
                notification: "BUTTON_1_CLICKED",
                targetModule: null,
                payload: { key: "value1" },
            },
            {
                label: "Button 2",
                notification: "BUTTON_2_CLICKED",
                targetModule: "TargetModuleName",
                payload: { key: "value2" },
            },
        ],
        menuLabel: "☰", // Default hamburger icon
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-ButtonNotifier.css"];
    },

    // Generate the DOM for the module
    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "button-notifier-menu";

        // Create the hamburger menu container
        const menuContainer = document.createElement("div");
        menuContainer.className = "hamburger-menu";

        // Create the hamburger button
        const menuButton = document.createElement("button");
        menuButton.className = "hamburger-icon";
        menuButton.innerHTML = this.config.menuLabel;

        // Create the dropdown menu
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown hidden"; // Initially hidden

        // Populate dropdown with buttons
        this.config.buttons.forEach((buttonConfig) => {
            const menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            menuItem.innerHTML = buttonConfig.label;

            // Attach event listeners
            menuItem.addEventListener("click", () => {
                this.handleButtonPress(buttonConfig);
            });

            dropdown.appendChild(menuItem);
        });

        // Toggle dropdown visibility on hamburger button click
        menuButton.addEventListener("click", () => {
            dropdown.classList.toggle("hidden");
        });

        // Assemble the menu
        menuContainer.appendChild(menuButton);
        menuContainer.appendChild(dropdown);
        wrapper.appendChild(menuContainer);

        return wrapper;
    },

    // Handle button press and send notifications
    handleButtonPress: function (buttonConfig) {
        if (buttonConfig.targetModule) {
            this.sendNotificationToModule(
                buttonConfig.targetModule,
                buttonConfig.notification,
                buttonConfig.payload
            );
        } else {
            this.sendNotification(buttonConfig.notification, buttonConfig.payload);
        }
        console.log(
            `Notification sent: ${buttonConfig.notification} to ${
                buttonConfig.targetModule || "ALL modules"
            } with payload:`,
            buttonConfig.payload
        );
    },

    // Custom method to send notifications to specific modules
    sendNotificationToModule: function (moduleName, notification, payload) {
        const targetModules = MM.getModules().filter((module) => module.name === moduleName);
        targetModules.forEach((module) => {
            module.notificationReceived(notification, payload, this);
        });
    },
});
