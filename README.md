<h1 align="center">
    IM4DEC - Identity Management for Digital Emergency Communication
</h1>

<p align="center">
    <a href="/../../commits/" title="Last Commit"><img src="https://img.shields.io/github/last-commit/NGI-TRUSTCHAIN/IM4DEC?style=flat"></a>
    <a href="/../../issues" title="Open Issues"><img src="https://img.shields.io/github/issues/NGI-TRUSTCHAIN/IM4DEC?style=flat"></a>
    <a href="./LICENSE" title="License"><img src="https://img.shields.io/badge/License:%20MIT-green.svg?style=flat"></a>
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#project-outcomes">Project Outcomes</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#licensing">Licensing</a>
</p>

## About

This repository hosts information and references to IM4DEC - Identity Management for Digital Emergency Communication. This is part of the deliverables for the NGI TRUSTCHAIN IM4DEC project that has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 101093274.

The IM4DEC project is an open-source contribution led by OwnYourData and DEC112 (both Austria). Read more on the project at [NGI TRUSTCHAIN page](https://trustchain.ngi.eu/im4dec/).

### Motivation
UN convention Article 9 requires countries to take measures for the full and equal participation of persons with disabilities, including access to communication and information services. Despite this, there are still about 1 million deaf and hard of hearing persons in Europe who currently rely on outdated technology (e.g. fax) and help from others to make an emergency call. With our project we aim to address this shortcoming and bring modern technology from identity management and conversational AI to the domain of text-based emergency communication focused on persons with disabilities.

### Use Cases & Essential Functionalities
The project was built around the following 4 main topics:
* **DEC112 Onboarding with ID Austria**  
  To provide a verified identity in the DEC112 app (available on [Android](https://play.google.com/store/apps/details?id=com.meecode.dec112.mobile.twodotzero) and [iOS](https://apps.apple.com/at/app/dec112-2-0/id1494002697)), the existing DEC112 registration element (Registration API) was updated to support the onboarding process using an existing eIDAS identity provider (in Austria the eIDAS conform "Bürgerkarte" and "Handy Signatur", and now the already available "ID Austria'' will develop into an eIDAS 2.0 compliant identity provider).
* **Triggering a Silent Emergency Notification from the Sphereon Wallet**  
  To give as many people as possible access to emergency services, DEC112 and the Austrian Ministry of the Interior extended its services in April 2022 to offer a "Silent Emergency Notification": either in situations when you cannot talk (e.g., shooting in a bank) or also for individuals oppressed by domestic violence. Especially, for domestic violence the challenge is to have an unobtrusive app, such that an aggressor does not remove the app from the victims smartphone.  
  In this use case we use a government issued identity (ID Austria) with OwnYourData acting as issuer for a Verifiable Credential that holds this government issued identity together with personal data (name, date of birth, and registered primary residence address). Based on this identity, SIP credentials are created and also added to the Verifiable Credential. The Verifiable Credential is added to an EU Digital Identity Wallet (we are using the [wallet from Sphereon](https://sphereon.com/sphereon-products/sphereon-wallet/) but it should work with any standard-conform EUDI wallet) and through the DEC112 SDK a silent emergency notification can be triggered from within the wallet.
* **ChatGPT Based Chatbot and Data Sharing**  
  On the other end of an emergency chat is an operator in a control room that needs to be specifically trained on how to handle text-based emergency communication. With the advent of AI-based chatbots (e.g., ChatGPT) we want to provide functionality to simulate a control room operator and enable all DEC112 users to test emergency chats without requiring a human operator. Those chats can be - upon consent - shared with emergency service providers to increase the available training material for operators.
* **DID Rotation**
  DID Rotation refers to the process of changing (or “rotating”) the underlying DID method for a given Decentralised Identifier. The concept is rooted in the best practices of cryptographic key rotation, where keys are changed periodically to reduce the risk of compromise. In the same way, periodically rotating a DID could reduce the risks associated with a specific DID method. And of course it avoids a lock-in situation into a given DID method.  

### Integration in Other Ecosystems  
Through a partnership with DanubeTech, we are poised to extend the functionality of the UniResolver.io service by incorporating support for DID Rotation. This innovative feature is designed to bolster security and adaptability in digital identity management, ensuring that users can seamlessly update and manage their decentralized identifiers (DIDs) in response to evolving needs or security concerns. Furthermore, our collaboration extends to enhancing the Sphereon Wallet by integrating a novel feature that allows users to make a Silent Emergency Notification. Leveraging government-issued ID credentials, such as those provided by ID Austria, this functionality is crafted to offer a discreet method for users to alert emergency services or contacts under duress, without drawing attention.

### Gaps Being Addressed
Our project tackles critical gaps in the emergency services domain by introducing a standardized, interoperable text-based communication solution alongside enhanced training opportunities. From a technical perspective, we are pioneering the implementation of DID Rotation, which allows for seamless switching between DID methods, thereby advancing the DID resolution specification efforts. Additionally, we are showcasing the practical application of DIDs within a real-world emergency communication scenario. A pivotal aspect of our work includes conducting and documenting a comprehensive Data Privacy Impact Assessment specifically for the use of DIDs, ensuring that our solutions not only meet technical and operational standards but also adhere to stringent data privacy regulations. This multifaceted approach addresses existing deficiencies and sets new benchmarks for innovation and privacy in emergency communications technology.

### Expected Benefits
Other projects and solutions will benefit from a registration element for onboarding based on a government issued ID and can use the Data Privacy Impact Assessments (DPIAs) as blue print for their own work. For wallet developers we provide a concrete implementation to offer a government service (emergency notification). In the DID community, the functionality of DID Rotation will lead to a convergence of the manifold DID methods.

### Demonstration Scenario
DEC112 emphasizes a strategic approach to deploying new components in production, focusing on maintaining the integrity and security of safety-critical environments. Our user engagement strategy outlines clear expectations for stakeholders and uses a mix of qualitative and quantitative metrics to monitor progress. Key engagement goals for our research project include:

- **Registration API:** engage with 50 users
- **Wallet:** demonstrate new funtionality with 15 users
- **Chatbot:** achieve 200 conversations with at least 50 users
- **DID Enhancements:** reach at least 15 users

These targets are designed to ensure statistical significance for valid conclusions and are manageable for effective data collection and analysis.


## Project Outcomes

The key deliverables of the project are as given. The table summarises the release status of all the deliverables.

| Identifier | Date             | Deliverable |
| :--------- | :--------------- | :---------- |
| D1         | 08-Sep-2023 | State Of The Art Overview, Use Case Analysis And Preliminary Technical Specification Of The Solution ([internal link to SharePoint](https://eurodyn.sharepoint.com/:b:/r/sites/TRUSTCHAIN/Shared%20Documents/OC1-Decentralised%20digital%20identity/OC1%20IM4DEC/3-Deliverables/TrustChain_OC1_D1_IM4DEC.pdf?csf=1&web=1&e=uc4J6q)) |
| D2         | 03-Nov-2023 | Detailed Technical Specification Of The Solution, Software Implementation Work Plan, Demo Scenarios, The Number Of End Users That Will Be Involved In Any Pilots, And Preliminary Business Plan ([internal link to SharePoint](https://eurodyn.sharepoint.com/:b:/r/sites/TRUSTCHAIN/Shared%20Documents/OC1-Decentralised%20digital%20identity/OC1%20IM4DEC/3-Deliverables/TrustChain_OC1_D2_IM4DEC.pdf?csf=1&web=1&e=sY2FQH)) |
| D3         | 26-Jan-2024 | Implementation, Deployment In An Appropriate Trustchain Platform, Testing, Demonstration And Validation Roadmap In A Real-Life Application ([internal link to SharePoint](https://eurodyn.sharepoint.com/:b:/r/sites/TRUSTCHAIN/Shared%20Documents/OC1-Decentralised%20digital%20identity/OC1%20IM4DEC/3-Deliverables/TrustChain_OC1_D3_IM4DEC.pdf?csf=1&web=1&e=EfSIXK)) |
| D4         | March 2024 | will be updated |

### Sourcecode Deliverables

| Repository | Description |
| :--------- | :---------- |
| https://github.com/OwnYourData/oydid | Own Your Decentralised Identifier - DID Method `did:oyd` |
| https://github.com/OwnYourData/didlint | DID Document Validation Service |
| https://github.com/OwnYourData/soya | Semantic Overlay Architectury (SOyA) for Data Model Management |
| https://github.com/OwnYourData/ssi-mobile-wallet | Sphereon Wallet with IM4DEC extensions ([original repo](https://github.com/Sphereon-Opensource/mobile-wallet)) |
| https://github.com/OwnYourData/veramo | Veramo Cor with IM4DEC extensions ([original repo](https://github.com/decentralized-identity/veramo)) |
| https://github.com/dec112/dc-reg-api | Registration API for DEC112 |
| https://github.com/dec112/dc-reg-sms | SMS Plugin for Registration API |
| https://github.com/dec112/dc-reg-ida | ID Austria Plugin for Registration API |
| https://github.com/dec112/dc-reg-sip | SIP Plugin for Registration API |
| https://github.com/OwnYourData/dc-dec_onboarding | DEC112 onboarding for EUDI wallets |
| https://github.com/dec112/ng112-js | SDK for connecting to DEC112 ESInet |
| https://github.com/OwnYourData/dc-chatbot | Chatbot simulating a control room for emergency chats |
| https://github.com/OwnYourData/dc-intermediary | Data Intermediary implementation | 


## Further Details

### Customer Engagement
Our Customer Engagement Strategy emphasizes a thorough and interactive approach throughout the deployment process. Starting with local implementation based on precise requirements and designs, we actively involve our users by engaging them in testing and soliciting feedback, particularly during the monitoring of key performance indicators (KPIs) to ensure the system meets their needs. This strategy is supported by detailed documentation and communication, ensuring transparency and collaboration at every step, from staging meetings to the final go-live decision in the production environment. The detailed steps are described in Deliverables 2 & 3.

### Monetisation
The long-term sustainability of the DEC112 solution will be ensured through a combination of governmental support, consulting in the area of emergency communication, and ongoing funding from stakeholders (including research grants). As the legal and governance requirements in this domain mature and become mandatory in the EU, we will explore opportunities for scaling up and expanding the system's reach to other European countries.

### Use Case Scenarios
In the domain of emergency communication, our project introduces innovative use case scenarios that focus on enhancing user trust and security through the integration of government-issued ID verification and the adoption of DID Rotation, aligning with the Decentralized Identity Foundation (DIF) community's standards. One pivotal scenario involves a streamlined onboarding process where users can easily register and verify their identity using their government-issued IDs, thus ensuring a reliable and secure method of identification crucial for emergency situations. Following registration, the implementation of DID Rotation enhances privacy and security, allowing users to periodically update their digital identities without compromising the continuity or integrity of their communication with emergency services. This dual approach not only strengthens the trust in digital emergency communication systems but also paves the way for a more resilient and user-centric emergency response ecosystem, where users' identity and data privacy are paramount.

### TRUSTCHAIN Partners
In collaboration with DanubeTech, TRUSTCHAIN is set to enhance the capabilities of the UniResolver.io service through the integration of DID Rotation. This cutting-edge development aims to elevate the security and flexibility of managing digital identities, enabling users to effortlessly refresh and control their decentralized identifiers (DIDs) to meet changing requirements or security challenges. Additionally, our partnership furthers the functionality of the Sphereon Wallet by introducing an innovative Silent Emergency Notification feature. Utilizing government-issued ID credentials, such as those from ID Austria, this feature provides users with a covert means of contacting emergency services or designated contacts in situations of distress, ensuring their safety without attracting undue attention.

### Human Centric Approach
Our research project adopts a human-centric approach, prioritizing the needs, security, and privacy of individuals at every stage. By integrating government-issued ID verification and pioneering DID Rotation in collaboration with DanubeTech, we ensure that users have a seamless, secure method to manage their digital identities, reflecting our commitment to adaptability and user trust. Furthermore, the introduction of a Silent Emergency Notification feature within the Sphereon Wallet exemplifies our dedication to offering discreet, life-saving communication options, catering to the real-world needs of users in distress. This approach not only underscores our focus on enhancing user experience and safety but also demonstrates our commitment to developing solutions that are both innovative and deeply rooted in addressing the practical and emotional needs of individuals in emergency situations.

### Team
* Christoph Fabianek - https://www.linkedin.com/in/fabianek/
* Jan Lindquist - https://www.linkedin.com/in/lindquistjan/
* Fajar Ekaputra - https://www.linkedin.com/in/fajarjuang
* Gabriel Unterholzer - https://www.linkedin.com/in/gunterholzer/
* Wolfgang Kampichler - https://www.linkedin.com/in/wolfgang-kampichler-03431517/
* Mario Murrent - https://www.linkedin.com/in/mario-murrent-872ab569/

### Entities
Our team is setup from two Austrian non-profit organisations: [OwnYourData](https://www.OwnYourData.eu) and [DEC112](https://www.DEC112.eu). Since 2015 OwnYourData develops and operates data management solutions. We are active in various domains spanning Data Literacy, Information Security, and Self-Sovereign Identity. DEC112 provides an easy, reliable and secure way for deaf or hard of hearing persons in Austria to text for help in an emergency through a simple and intuitive interface.

## Contributing

Feel free to improve the software and send us a pull request. If you found any problems, please create an issue in this repo.

## Licensing
Copyright (c) 2023-24 [OwnYourData.eu](https://www.OwnYourData.eu) and [DEC112.at](https://www.dec112.at), Austria

If not otherwise stated the software is licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the LICENSE for the specific language governing permissions and limitations under the License.