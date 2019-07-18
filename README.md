# camel.js
Camel.js is JavaScript library for visualizing process capability index. 
## Installation
[Download](https://github.com/qarakenbacho/camel.js/blob/master/camel.js/Camel.js) Camel.js library and add to your /js folder.

<img src="https://github.com/qarakenbacho/camel.js/blob/master/images/installation.PNG" title="Installation" alt="Installation">

## Usage
**Step 1.** Call Camel.js in your index page.
```bash
  <script src="/js/Camel.js"></script>
```
**Step 2.** Create a container for chart and set an id.
```bash
  <div id="container" style="width: 50%; height: 1000px;"></div>
```
**Step 3.** Initailize Camel() and put variables.
```bash
  <script>
    let arifmeticMean = 5;
    let sigma = 1.4;
    let lsl = 1;   
    let usl = 10;
    let camel = new Camel("container");
    camel.chart(arifmeticMean, sigma, lsl, usl);
  </script>
```
## Result
**Full code.**
```bash
  <body>
    <div id="container" style="width: 50%; height: 1000px;"></div>
    <script src="/js/Camel.js"></script>
    <script>
      let arifmeticMean = 5;
      let sigma = 1.4;
      let lsl = 1;   
      let usl = 10;
      let camel = new Camel("container");
      camel.chart(arifmeticMean, sigma, lsl, usl);
    </script>
  </body>
```
**Visual result.** Graph with default settings.

<img src="https://github.com/qarakenbacho/camel.js/blob/master/images/initial%20result.gif" title="Initial result" alt="Initial result">


## Settings
Functions to change default values(background color, line weight, font size etc.)

|  **Function** | **Type** | **Default value** | **Description**  |
| --- | --- | --- | --- |
|  `setBackgroundColor()` | String | #D3D3D3 | Setting background color to chart  |
|  `setIsAnimationEnabled()` | Boolean | true | Setting animation |
|  `setLslLineColor()` | String | #00FF00 | Setting lsl(lower specification limit) line color |
|  `setLslLineWeight()` | Int | 3 | Setting lsl(lower specification limit) line weight |
|  `setLslLabelColor()` | String | #000000 | Setting lsl(lower specification limit) label color |
|  `setLslLabelSize()` | Int | 18 | Setting lsl(lower specification limit) label size |
|  `setUslLineColor()` | String | #00FF00 | Setting usl(upper specification limit) line color |
|  `setUslLineWeight()` | Int | 3 | Setting usl(upper specification limit) line weight |
|  `setUslLabelColor()` | String | #000000 | Setting usl(upper specification limit) label color |
|  `setUslLabelSize()` | Int | 18 | Setting usl(upper specification limit) label size |
|  `setCslLineColor()` | String | #FFFF00 | Setting csl(center specification limit) line color |
|  `setCslLineWeight()` | Int | 3 | Setting csl(center specification limit) line weight |
|  `setScaleLineColor()` | String | #00FF00 | Setting scale line color |
|  `setScaleLineWeight()` | Int | 3 | Setting scale line weight |
|  `setScaleLabelColor()` | String | #000000 | Setting scale label color |
|  `setScaleLabelSize()` | Int | 18 | Setting scale label size |
|  `setScaleCircleColor()` | String | #FFFF00 | Setting scale circle color |
|  `setScaleCircleRadius()` | Int | 3 | Setting scale circle radius |
|  `setGraphColor()` | String | #FF0000 | Setting main line graph color |
|  `setGraphWeight()` | Int | 3 | Setting main line graph weight |
|  `setGraphLabelColor()` | String | #000000 | Setting main graph label color |
|  `setGraphLabelSize()` | Int | 18 | Setting main graph label size |
|  `setInfoTextColor()` | String | #000000 | Setting info text color |
|  `setInfoTextSize()` | Int | 18 | Setting info text size |

**Example**
```bash
  <script>
    let arifmeticMean = 5;
    let sigma = 1.4;
    let lsl = 1;   
    let usl = 10;
    let camel = new Camel("container");
    camel.setBackgroundColor("#ffffff");
    camel.setIsAnimationEnabled(false);

    camel.setLslLineColor("#0000ff");
    camel.setLslLineWeight(2);
    camel.setLslLabelColor("#1E90FF");
    camel.setLslLabelSize(16);

    camel.setUslLineColor("#0000ff");
    camel.setUslLineWeight(2);
    camel.setUslLabelColor("#1E90FF");
    camel.setUslLabelSize(16);

    camel.setCslLineColor("#d3d3d3");
    camel.setCslLineWeight(2);

    camel.setScaleLineColor("#0000ff");
    camel.setScaleLineWeight(2);
    camel.setScaleLabelColor("#1E90FF");
    camel.setScaleLabelSize(12);
    camel.setScaleCircleColor("#0000ff");
    camel.setScaleCircleRadius(2);

    camel.setGraphColor("#00ff00");
    camel.setGraphWeight(2);
    camel.setGraphLabelColor("#1E90FF");
    camel.setGraphLabelSize(18);

    camel.setInfoTextColor("#1E90FF");
    camel.setInfoTextSize(18);
    camel.chart(arifmeticMean, sigma, lsl, usl);
  </script>
```
**Result**

<img src="https://github.com/qarakenbacho/camel.js/blob/master/images/result.png" title="Result" alt="Result">
