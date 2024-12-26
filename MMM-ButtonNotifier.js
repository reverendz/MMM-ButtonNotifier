Module.register("MMM-ButtonNotifier", {
    // Default module configuration
    defaults: {
        buttons: [
            {
                label: "Button 1",
                notification: "BUTTON_1_CLICKED",
                targetModule: null, // Send to all modules by default
                payload: { key: "value1" },
            },
            {
                label: "Button 2",
                notification: "BUTTON_2_CLICKED",
                targetModule: "TargetModuleName",
                payload: { key: "value2" },
            },
        ],
        menuLabel: "Menu", // Label for the hamburger menu
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-ButtonNotifier.css"];
    },

    // Generate the DOM for the module
    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "button-notifier-menu";

        // Create hamburger menu
        const menuContainer = document.createElement("div");
        menuContainer.className = "hamburger-menu";

        const menuButton = document.createElement("button");
        menuButton.className = "hamburger-icon";
        menuButton.innerHTML = "☰"; // Unicode hamburger icon

        // Dropdown container
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown hidden";

        this.config.buttons.forEach((buttonConfig) => {
            const menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            menuItem.innerHTML = buttonConfig.label;

            // Add touch and click event listeners
            menuItem.addEventListener("touchstart", (event) => {
                event.preventDefault(); // Prevent touch conflicts
                this.handleButtonPress(buttonConfig);
            });

            menuItem.addEventListener("click", () => {
                this.handleButtonPress(buttonConfig);
            });

            dropdown.appendChild(menuItem);
        });

        // Show/hide dropdown on menu button click
        menuButton.addEventListener("click", () => {
            dropdown.classList.toggle("hidden");
        });

        menuContainer.appendChild(menuButton);
        menuContainer.appendChild(dropdown);
        wrapper.appendChild(menuContainer);

        return wrapper;
    },

    // Handle button press and send notifications
    handleButtonPress: function (buttonConfig) {
        if (buttonConfig.targetModule) {
            // Sen
