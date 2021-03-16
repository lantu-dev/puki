<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MPL-2.0 License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/lantu-dev/puki">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Puki - BUPT Lantu Developer Platform</h3>

  <p align="center">
    An awesome Developer Platform to develop your projects!
    <br />
    <!-- <a href="https://github.com/lantu-dev/puki"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://stagging.blueprint.org.cn/puki/master/app/">View Demo</a>
    ·
    <a href="https://github.com/lantu-dev/puki/issues">Report Bug</a>
    ·
    <a href="https://github.com/lantu-dev/puki/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->


### Built With


* [React](https://reactjs.org)
* [GORM](https://gorm.io)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
* golang

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lantu-dev/puki.git
   ```
2. Download Go Mod
   ```sh
   go mod download
   ```
3. Install NPM packages
   ```sh
   cd app && yarn && cd ..
   cd site && yarn && cd ..
   ```
4. MakeDir For Build
   ```
   mkdir build
   ```
5. Build frontend
   ```
   cd app && ENABLE_GATEWAY=true yarn build && mv dist ../build/ && cd ..
   ```
6. Build docusaurus
   ```
   sed -i 's/CI_BUILED_BASEURL/\//' ./site/docusaurus.config.js && cd site && yarn build && mv build ../build/dist/site && cd ..
   ```
7. Build backend
   ```
   CC=aarch64-linux-gnu-gcc CXX=aarch64-linux-gnu-g++ CGO_ENABLED=1 GOOS=linux GOARCH=arm64 go build -o build/puki github.com/lantu-dev/puki/cmd/main
   ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/lantu-dev/puki/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MPL-2.0 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact


Project Link: [https://github.com/lantu-dev/puki](https://github.com/lantu-dev/puki)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lantu-dev/puki?style=for-the-badge
[contributors-url]: https://github.com/lantu-dev/puki/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lantu-dev/puki.svg?style=for-the-badge
[forks-url]: https://github.com/lantu-dev/puki/network/members
[stars-shield]: https://img.shields.io/github/stars/lantu-dev/puki.svg?style=for-the-badge
[stars-url]: https://github.com/lantu-dev/puki/stargazers
[issues-shield]: https://img.shields.io/github/issues/lantu-dev/puki.svg?style=for-the-badge
[issues-url]: https://github.com/lantu-dev/puki/issues
[license-shield]: https://img.shields.io/github/license/lantu-dev/puki.svg?style=for-the-badge
[license-url]: https://github.com/lantu-dev/puki/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png