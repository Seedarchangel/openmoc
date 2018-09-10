OpenMOC
=================
OpenMOC is a satellite tracking web application, built in React.

[中文文档](https://github.com/Seedarchangel/TuChart/blob/master/Example_Graphs/En_US.md)

## Examples
#### Satellite Map
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/map_2.png?raw=true)
#### Polar View
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/polar_many.png)
#### Upcoming Passes
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/passes.png)
#### Sky at a Glance
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/timeline.png)

## Setup Instructions
Install all necessary dependencies

```pip install pyecharts==0.2.0```

```pip install tushare==0.8.6```

To install Tuchart, enter
```pip install tuchart```
in your terminal

#### Notice：For best plotting experience，please download the latest version = 0.1.2.7

then, under your tuchart directory, e.g:

```/user/anaconda/lib/python2.7/site-packages/tuchart```

run```python main.py```

The exact path of tuchart in your directory can be located by```pip show tuchart```:
![notebook-0](https://github.com/Seedarchangel/TuChart/blob/master/Example_Graphs/tuchart_path.png)
add```/tuchart```to pinpoint the tuchart directory.

Right click to choose the name of stock and type of data you would like to plot. Then, press the green arrow button to plot. Due to the size constraints, it is recommended to plot fewer than 5 graphs at the same time.

![Manual](https://github.com/Seedarchangel/TuChart/blob/master/Example_Graphs/SLYJiZEBeD.gif)

## Tuchart Currently Supports:
* Raw Stock Data
  * Daily average
  * Weekly average
  * Monthly average
  * 15 minute average
  * 30 minute average
* Restoration Data
  * Daily average
  * Weekly average
  * Monthly average
  * 15 minute average
  * 30 minute average
* Tick data of individual stocks
* High frequency data within one day

High frequency data is calculated from tick data of your chosen day. Algorithm: [如何用TICK数据生成分钟线数据](https://mp.weixin.qq.com/s?__biz=MzAwOTgzMDk5Ng==&mid=2650833965&idx=1&sn=e3e74639c068e7a1e41a35bb1decd313&chksm=80adb316b7da3a00de4191d4da6a5a7cab60fa3d282876fcf0b4d6dd8fc234528a316f5aa50a&mpshare=1&scene=1&srcid=090514fJTxEaB4CbnBI85x60&pass_ticket=qA7MkXEYQz2xA0uHwCD8eF43XfYsQMFMTyDT0euW7YFDRhLeVPR8dAxIaK6gxprk#rd)
* Distribution of Top Shareholders

 Tuchart will return data for top shareholders within your chosen year.
![Manual](https://github.com/Seedarchangel/TuChart/blob/master/Example_Graphs/Screen%20Shot%202017-09-06%20at%2012.33.55%20AM.png?raw=true)
## Updates
0.1.2.5
* Supports plotting for High frequency data 
  * 1 minute average
  * 5 minute average
  * 15 minute average
  * 30 minute average
* Supports plotting of top shareholders within a year.

0.1.2.4
* Fixed dependency issues when user has PYQT4 Layer

0.1.2.3
* Added script to save stock list every 12 hours
* Increased stability
* Auto-resize image according to size of the app
* Added market indexes

## Contact:
Email: rzli2@illinois.edu

