# DEC112 Chatbot
Implementation of an OpenAI ChatGPT-based chatbot for DEC112

## Resources
* Project description: https://trustchain.ngi.eu/im4dec/    

## Configuration Options

Use the following environment variables to configure the chatbot:
* `CHAT_LANG` = en | de (default: "de")
* `DEFAULT_CALLTYPE` = ambulance | fire | police (default: "ambulance")  
* `OAI_ACCESS_TOKEN` - OpenAI access token  
* `OAI_MODEL` gpt-3.5-turbo | gpt-4 (default: "gpt-3.5-turbo")
* `OAI_SYSTEM` - text file in configure/textblocks that provides configuration/context for chatbot (default: "OAI_system_default.txt")  
* `WS_ENDPOINT` - websocket endpoint

&nbsp;    

## Issues

Please report bugs and suggestions for new features using the [GitHub Issue-Tracker](https://github.com/OwnYourData/dc-chatbot/issues) and follow the [Contributor Guidelines](https://github.com/twbs/ratchet/blob/master/CONTRIBUTING.md).

If you want to contribute, please follow these steps:

1. Fork it!
2. Create a feature branch: `git checkout -b my-new-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push into branch: `git push origin my-new-feature`
5. Send a Pull Request

&nbsp;    

## About  

<img align="right" src="https://raw.githubusercontent.com/OwnYourData/dc-intermediary/main/res/logo-ngi-trustchain-positive.png" height="100">This project has received funding from the European Union’s Horizon 2020 research and innovation program through the [NGI TRUSTCHAIN program](https://trustchain.ngi.eu/) under cascade funding agreement No 101093274.

<br clear="both" />

## License

[MIT License 2024 - DEC112.eu](https://github.com/OwnYourData/dc-chatbot/blob/main/LICENSE)
