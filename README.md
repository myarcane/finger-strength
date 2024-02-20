# finger-strength 

This project is still a **work in progress**

I've been a **climber since 2015**, and I've always aimed to "scientifically" measure my grip strength. With this project, I'm endeavoring to create something akin to the Lattice training [digital rung](https://latticetraining.com/2019/07/05/lattice-digital-research-rung-qa/). You can watch this [video](https://www.youtube.com/watch?v=eopeSRfhrMQ) by Lattice Training where they test the grip strength of professional climber Stefano Ghisolfi using the digital rung.

At the moment, my software only measures **maximum voluntary contraction**, but I may incorporate **critical force** assessment in the future. Here are some pictures of my homemade version of the digital rung.

<img src="https://github.com/myarcane/finger-strength/assets/1671293/c314a6b6-210e-4053-8dc4-cf4abaca06e5" width="35%" height="35%" />

I will share more pictures about this project and especially pictures of the software.
I will also share more details on how to do the setup.

## Inspiration

I got inspired by the awesome [work done by Phillip Bulling](https://philaudio.wordpress.com/projects/climbing/) in Python.
My setup is different tho, I use a hx711 load cell and a Raspberry pi 3. My software uses web technologies:

 - TypeScript and React for the frontend
 - Go for the backend

## Hardware setup
<img src="https://github.com/myarcane/hx711-service/assets/1671293/113b589c-7e12-451d-b6d1-01a76092b357" width="50%" height="50%" />


- A [load cell high precision](https://www.amazon.ca/dp/B077YHNNCP?psc=1&ref=ppx_yo2ov_dt_b_product_details).
  Mine is a **100kg** load cell capacity but it will also work with other capacities.
- A [hx711 load cell amplifier](https://www.amazon.ca/-/fr/Oiyagai-capteurs-pes%C3%A9e-double-pr%C3%A9cision/dp/B0779RZYF1/ref=sr_1_31)
- I used a [Raspberry pi 3 B+](https://www.pishop.ca/product/raspberry-pi-3-model-b-plus/) but it can probably work with newer Raspberry pi versions

### Hardware wiring
- The load cell **red cable** is connected to hx711 **E+**
- The load cell **black cable** is connected to hx711 **E-**
- The load cell **green cable** is connected to hx711 **A-**
- The load cell **white cable** is connected to hx711 **A+**
- The hx711 **VCC** is connected to Raspberry pi **3.3V pin**
- The hx711 **Data** (DT) is connected to Raspberry pi **GPIO pin 5**
- The hx711 **Clock** (SCK) is connected to Rapsberry pi **GPIO pin 6**
- The hx711 **ground** (GND) is connected to Raspberry pi **GPIO ground**

### Main dependency

This service uses the [Raspberry Pi HX711 C++](https://github.com/endail/hx711) library to access the weight outputs of a hx711 loadcell.
