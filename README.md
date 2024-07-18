# Slack Avatar Changer

Slack Avatar Changer is a Tampermonkey script that allows you to change user avatars on Slack using file input, save them in local storage, and clear the changes if needed.

## Features

- Change user avatars by uploading images.
- Save custom avatars in local storage.
- Clear custom avatars and restore the original ones.
- Handles avatars in chats as well.
- Works with dynamically loaded content.

## Installation

1. **Install Tampermonkey**

   First, you need to install Tampermonkey, a browser extension that allows you to run userscripts.

   - [Tampermonkey for Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome)
   - [Tampermonkey for Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox)
   - [Tampermonkey for Safari](https://tampermonkey.net/?ext=dhdg&browser=safari)
   - [Tampermonkey for Microsoft Edge](https://tampermonkey.net/?ext=dhdg&browser=edge)
   - [Tampermonkey for Opera](https://tampermonkey.net/?ext=dhdg&browser=opera)

2. **Install the Script**

   After installing Tampermonkey, click [here](https://github.com/MysMon/slack-avatar-changer/raw/master/src/slack-avatar-changer.user.js) to install the Slack Avatar Changer script directly.

## Usage

Once the script is installed and running:

1. Open Slack in your browser.
2. Navigate to a user's profile.
3. You will see two buttons: "Change Avatar" and "Clear Avatar".
   - Click "Change Avatar" to upload a new image for the user's avatar.
   - Click "Clear Avatar" to remove the custom avatar and restore the original one.
4. The custom avatar will be applied and saved in local storage.

## Development

If you want to contribute or make modifications, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MysMon/slack-avatar-changer.git
   ```

2. Open the script file in a text editor:

   ```bash
   cd slack-avatar-changer/src
   open slack-avatar-changer.user.js
   ```

3. Make your changes and save the file.
4. Load the modified script in Tampermonkey by creating a new userscript and pasting your changes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub:

- [Open an Issue](https://github.com/MysMon/slack-avatar-changer/issues)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
