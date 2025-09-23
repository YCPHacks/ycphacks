<template>
  <div class="landing-page">

    <div class="schedule" id="schedule">
      <div class="container">
        <div class="header">
          <div class="circle" style="font-size:27px; height:100px;">
            <p>2024 Schedule</p>
          </div>
        </div>

        <div class="schedule-content">
          <div id="day-tag"><b>Friday</b> November 1st, 2024</div>

          <table class="table table-bordered" style="margin-bottom:35px">
            <tbody>
              <tr>
                <th scope="row">5 PM</th>
                <th>Doors Open and Dinner</th>
              </tr>
              <tr>
                <th scope="row">6:30 PM</th>
                <th>Opening Ceremony</th>
              </tr>
              <tr>
                <th colspan="2" scope="row" style="color:#000;background-color:#fff">7PM - HACKING BEGINS!</th>
              </tr>
              <tr>
                <th scope="row">7:30 PM</th>
                <th>Team and Idea Building</th>
              </tr>
              <tr>
                <th scope="row">9:00 PM</th>
                <th>Bryce Warner - 3D Printing</th>
              </tr>
              <tr>
                <th scope="row">10:30 PM</th>
                <th>Matrix Nerf Challenge</th>
              </tr>
              <tr>
                <th scope="row">12 AM</th>
                <th>Midnight Nerf War</th>
              </tr>
            </tbody>
          </table>

          <div id="day-tag"><b>Saturday</b> November 2nd, 2024</div>
          <table class="table table-bordered" style="margin-bottom:35px">
            <tbody>
              <tr>
                <th scope="row">2 AM</th>
                <th>Trivia/Kahoots</th>
              </tr>
              <tr>
                <th scope="row">8:30 AM</th>
                <th>Breakfast</th>
              </tr>
              <tr>
                <th scope="row">10 AM</th>
                <th>Bee Central Workshop</th>
              </tr>
              <tr>
                <th scope="row">12 PM</th>
                <th>Lunch</th>
              </tr>
              <tr>
                <th scope="row">1 PM</th>
                <th>Dr. Hake - Workshop talk Coming Soon</th>
              </tr>
              <tr>
                <th scope="row">2 PM</th>
                <th>QUEST</th>
              </tr>
              <tr>
                <th scope="row">3 PM</th>
                <th>Dr. Babcock - Workshop talk Coming Soon</th>
              </tr>
              <tr>
                <th scope="row">6:00 PM</th>
                <th>Dinner</th>
              </tr>
              <tr>
                <th scope="row">7:00 PM</th>
                <th>Slideshow Karaoke</th>
              </tr>
              <tr>
                <th scope="row">8:30 PM</th>
                <th>Prof Zeller - Fire Spinning </th>
              </tr>
              <tr>
                <th scope="row">10 PM</th>
                <th>QUEST</th>
              </tr>
              <tr>
                <th scope="row">12 AM</th>
                <th>Midnight Whoopie Pies</th>
              </tr>
            </tbody>
          </table>

          <div id="day-tag"><b>Sunday</b> November 3rd, 2024</div>
          <table class="table table-bordered" style="margin-bottom:35px">
            <tbody>
              <tr>
                <th scope="row">1 AM</th>
                <th>Daylight Savings Event</th>
              </tr>
              <tr>
                <th scope="row">8:30 AM</th>
                <th>Breakfast</th>
              </tr>
              <tr>
                <th colspan="2" scope="row" style="color:#000;background-color:#fff">9 AM - HACKING ENDS!</th>
              </tr>
              <tr>
                <th scope="row">10 AM</th>
                <th>Presentations &amp; Judging</th>
              </tr>
              <tr>
                <th scope="row">12 PM</th>
                <th>Closing Ceremonies</th>
              </tr>
            </tbody>
          </table>
          <div style="margin-bottom:35px">* Schedule is subject to change.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
    font-family: Lato, sans-serif;
    color: #fff;
    font-weight: 300;
    font-size: 18px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.na
.intro .main-header {
    text-align: center;
    display: block;
    position: relative;
    z-index: 100;
}
.intro .circle {
    display: inline-block;
    width: 200px;
    height: 100px;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10%;
    border: 6px solid #fff;
    text-align: center;
    color: white;
    line-height: 100px;
    font-size: 20px;
    transition: all .3s ease;
}
.bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
    -webkit-transform-origin: center bottom;
    -ms-transform-origin: center bottom;
    transform-origin: center bottom;
}
.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
a {
    background-color: transparent;
}
.landing-page {
  text-align: center;
  background-color: #ccffcc;
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
}

#bgvideo {
  position: relative;
  opacity: 0.7;
  background-color: black;
  width: 125%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translateX(-50%);
  /* z-index: -100; */
  object-fit: cover; /* Cover the area without distortion */
  z-index: 1; /* Lower z-index to place it behind content */

}

.intro {
  position: relative;
  z-index: 1;
  color:white;
  background-color: rgba(0, 0, 0, 0.01);
  /* margin-top: 10px; */
  padding:20px;
  bottom: 850px;
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center; /* Center content */
}

.intro h1 {
  font-family: 'Headliner', sans-serif;
  font-size: 60px;
}

.intro h2 {
  font-size: 30px;
}

.circle {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 0;
  border: 6px solid #fff;
  text-align: center;
  color: white;
  line-height: 100px;
  font-size: 20px;
  transition: all 0.3s ease;
  padding-bottom: 10%;

}

.header .circle {
    background: #fff;
    position: relative;
    -webkit-transform: skew(-20deg);
    -moz-transform: skew(-20deg);
    -o-transform: skew(-20deg);
    transform: skew(-20deg);
}
.container {
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 38px 20px;
    box-sizing: border-box;
}

@media (min-width: 550px) {
    .container {
        width: 80%;
    }
}
@media (min-width: 400px) {
    .container {
        width: 85%;
        padding: 0;
    }
}
.header {
    text-align: center;
}
.circle p {
    font-size: 32px;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
}
pre, blockquote, dl, figure, table, p, ul, ol, form {
    margin-bottom: 2.5rem;
}
.intro #fountain {
    display: block;
    position: relative;
    margin: auto;
    max-height: 100px;
    margin-bottom: -100px;
}
img{
  border:0;
}
.intro h1 {
    padding-top: 100px;
   font-family: 'Headliner', sans-serif;
    font-size: 60px;
}
.circle p {
    font-size: 32px;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
}
 .attend {
  position: relative;
  text-align: center;
  padding-bottom: 100px;
  padding-top: 100px;
  background-color: transparent; /* Make the background transparent */
}

.green-box {
  background-color: #64965d; /* Green color */
  padding: 50px; /* Padding to add space inside the green box */
  border-radius: 10px; /* Rounded corners for the green box */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow for visual effect */
}

.container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px; /* Add margin between the videos */
  position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 38px 20px;
    box-sizing: border-box;
}

#fountain2 {
  margin-bottom: 0;
}

iframe {
  border-radius: 10px; /* Rounded corners for videos */
}

h1{
  line-height:1.2;
  letter-spacing:-.1rem;
}
h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 300;
}
h1 {
    font-size: 2em;
    margin: 0.67em 0;
}
.apply-now-heading {
  font-size: 5.0rem;
  text-align: center;
  font-size: 36px;
  margin-top: 50px; /* Space above the text */
  color: white; /* You can change this to match the design */
}
.schedule {
    margin-top: 50px;
    background-color:#93dda3;
}
.schedule .header .circle {
    font-size: 40px;
}

.circle p {
    color:#64965d;
    font-size: 32px;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
}
#day-tag {
    font-size: 50px;
}

</style>