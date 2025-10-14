<template>
  <div class="landing-page">
    <!-- Background Video -->
    <video v-if="!isLoggedIn" autoplay loop muted id="bgvideo" preload="auto">
      <source src="/bg.mp4" type="video/mp4" />
    </video>

    <!-- Introduction Section -->
    <div v-if="!isLoggedIn" class="intro">
      <div class="container">
        <div class="main-header">
          <!-- <img id="fountain" src="../assets/fountainWhite.png"/> -->
          <h1>YCP Hacks</h1>
          <h2>November 1 - 3, 2024</h2>
          <h2>York College of Pennsylvania</h2>
          <div>
            <router-link class="register-button" to="/register">Create<br> Account</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div v-if="!isLoggedIn" class="about" id="about" style="margin-top: 150px;">
      <div class="container">
        <div class="header">
          <div class="circle">
            <p>About</p>
          </div>
        </div>
        <div class="row">
          <div class="text">
            <h4>To York and Beyond</h4>
            <p>Conveniently nestled in rural Pennsylvania, YCP Hacks is a college level hackathon with small town charm. An hour north of Baltimore, an hour and a half from Philadelphia, and 2 hours from Penn State places it right in the middle of Pennsylvania Dutch Country (presumably made of Funnel Cake). The event is set on the charming York College of Pennsylvania campus, with all the facilities, people and camaraderie that comes with it. Our mission is to promote technical knowledge, innovation, and entrepreneurship in York and beyond, and we just can&#39;t wait to see what you do next.</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoggedIn" class="attend" id="attend">
      <div class="green-box">
        <div class="container1" style="margin: auto; text-align: center;">
          <div style="float: left; font-size: 75px; margin-right: 50px;">
            <!-- <img id="fountain2" src="../assets/fountainWhite.png" style="width: 125px; height: 115px; margin-bottom: 0px;" /> -->
            <br />2021<br /> Recap Video
          </div>
          <div style="float: right;">
            <iframe width="500" height="380" src="https://www.youtube.com/embed/Ru9zvWGSH8U?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
        <div class="container1" style="margin: auto; text-align: center;">
          <div style="float: left; font-size: 75px; margin-right: 50px;">
            <!-- <img id="fountain2" src="../assets/fountainWhite.png" style="width: 125px; height: 115px; margin-bottom: 0px;" /> -->
            <br />2017<br /> Recap Video
          </div>
          <div style="float: right;">
            <iframe width="500px" height="380px" src="https://www.youtube.com/embed/k5A2QTasITs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>

        <!-- "Can't wait to apply?" heading placed below the videos -->
        <h1 class="apply-now-heading">Can't wait to apply?</h1>
       <p>Sign up <a href="http://146.190.66.30:4174/" style="color: white; font-size:22px;"> here</a> and we&#39;ll let you know when our application is open!</p>
      </div>
    </div>
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

    <div class="faq" id="faq">
      <div class="container">
        <div class="header">
          <div class="circle">
            <p>FAQ</p>
          </div>
        </div>
      </div>
    </div>
    <div class="question">
      <h3>What&#39;s a hackathon?</h3>

      <p>A 36 hour event where you work together with a team to make something awesome. You don&#39;t need to know how to code or be a supreme hacker, just how to be creative! You can also get help from our mentors and speakers who will be attending.</p>

      <h3>Can I come?</h3>

      <p>We&#39;ll take any college student from anywhere on earth! We sadly cannot accept students under the age of 18. All students from outside of York College may be asked to attend online if Covid protocols change</p>

      <h3>Where is this going to be?</h3>

      <p>The Willman Business Center of <a href="https://goo.gl/maps/UzhJ14rStMz" target="_blank">York College!</a> There will be free parking <a href="https://goo.gl/maps/p1itMccEKvx" target="_blank">in the adjacent lot for the entire weekend.</a></p>

      <h3>When will this be?</h3>

      <p>November 1 - 3 2024</p>

      <h3>Why?</h3>

      <p>Learn new things, meet new people, and tons of free food and swag.</p>

      <h3>Will you reimburse travel?</h3>

      <p>If we get enough sponsors this season, we may offer it closer to the event date. At this time we cannot confirm it though. Apply and we&#39;ll email our applicants with more information as it becomes available.</p>

      <h3>I don&#39;t have a team so....</h3>

      <p>Well you&#39;re in luck! We have tons of team building activities if you don&#39;t have a team to come with you. You can also work alone if you&#39;d like.</p>

      <h3>But I can&#39;t code!</h3>

      <p>We&#39;ll have tons of great workshops and mentors to help you learn and build something amazing!</p>

      <h3>How much does it cost?</h3>

      <p>Nothing! Registration is free and food will be provided for you. And of course, swag is free too.</p>

      <h3>Will there be hardware available?</h3>

      <p>Yes! Hardware will be provided.</p>

      <h3>What should I bring?</h3>

      <p>ID, Clothing, sleeping bag, and any necessary tech (and chargers). And deodorant. Please.</p>

      <h3>Do I keep my Intellectual Property?</h3>

      <p>Yes! Participants retain 100% of the intellectual property that they create during the event.</p>

      <h3>Are there any rules?</h3>

      <p>You can find the MLH code of conduct <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">here</a>.</p>

      <h3>You didn&#39;t answer my question!</h3>

      <p>Send it to us at <a href="mailto:info@ycphacks.io">info@ycphacks.io!</a>.</p>
    </div>
  </div>

  <div class="prizes" id="prizes">
    <div class="container">
      <div class="header">
        <div class="circle" style="font-size:32px">
          <p>PRIZES</p>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="prize-titles" style="text-align:center;">
      <h3 style="font-size:30px">Quest 3</h3>
      <h3 style="font-size:30px">Smart TV</h3>
      <h3 style="font-size:30px">Quest 2</h3>
      <h3 style="font-size:30px">Nintendo Switch</h3>
      <h3 style="font-size:30px">Creality Ender 3D Printer</h3>
      <h3 style="font-size:30px">TECBOSS 3D Pen and filament</h3>
      <h3 style="font-size:30px">Beats Solo 3 Headphones</h3>
      <h3 style="font-size:30px">Amazon Echo</h3>
      <h3 style="font-size:30px">Apple Homepod Mini</h3>
      <h3 style="font-size:30px">Google Nest Speaker</h3>
      <h3 style="font-size:30px">Beats Pill</h3>
      <h3 style="font-size:30px">Gaming Keyboard and Mouse</h3>
      <h3 style="font-size:30px">Gaming Chair</h3>
      <h3 style="font-size:30px">Arduino Starter Kit</h3>
      <h3 style="font-size:30px">Google Swag!</h3>
      <h3 style="font-size:30px">$200+ in gift cards</h3>
      <h3 style="font-size:30px">$1000+ in cash prizes</h3>
      <h3 style="font-size:30px">Sponsored Hacks to Come!</h3>
      <h3 style="font-size:30px"> </h3>

      <div class="prize-inner">
      </div>
    </div>
  </div>
  <div class="sponsors" id="sponsors">
    <div class="container">
      <div class="main-sponsors">
        <div class="header">
          <div class="circle">
            <p>2024 Sponsors</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sponsor-images" style="background-color:white;">
    <a
      v-for="sponsor in sponsors"
      :key="sponsor.name"
      :href="sponsor.website"
      target="_blank"
      class="sponsor-link"
    >
      <template v-if="sponsor.logoUrl">
        <img
          :src="sponsor.logoUrl"
          :alt="`${sponsor.name} Logo`"
          class="sponsor-logo"
          :style="getSponsorStyle(sponsor)"
        />
      </template>
      <template v-else>
        <span class="sponsor-name" :style="getSponsorStyle(sponsor)">{{ sponsor.name }}</span>
      </template>
    </a>
    <p v-if="sponsors.length === 0" style="padding: 30px; font-size: 20px; color: #64965d;">
      Be the first! Contact us to become a sponsor.
    </p>
  </div>

</template>

<script>
import { ref, onMounted } from "vue";
import sponsorService from "../services/sponsorService";
import { mapGetters } from "vuex";

export default {
  name: "LandingPage",
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  setup(){
    const sponsors = ref([]);
    const eventYear = ref(2024);
    const CURRENT_EVENT_ID = 1;

    const sponsorSizes = {
      'Platinum': { width: '200px', height: '200px', fontSize: '24px' },
      'Gold': { width: '150px', height: '150px', fontSize: '20px' },
      'Silver': { width: '100px', height: '100px', fontSize: '16px' },
      'Bronze': { width: '50px', height: '50px', fontSize: '14px' },
    }

    const getSponsorStyle = (sponsor) => {
      const tierName = sponsor.tier;
      const style = sponsorSizes[tierName];

      if(sponsor.logoUrl){
        return {
          width: style.width,
          height: style.height,
          objectFit: 'contain'
        };
      }else{
        return {
          width: style.width,
          height: style.height,
          fontSize: style.fontSize,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        };
      }
    };

    const fetchSponsors = async () => {
      try{
        const tierResponse = await sponsorService.getSponsorTiers();
        console.log("Tier Data Received: ", tierResponse);
        const tierMap = tierResponse.reduce((map, tier) => {
          map[tier.id] = tier.tier;
          return map;
        }, {});
        console.log("Final Tier Map for lookup: ", tierMap);

        const rawSponsorResponse = await sponsorService.getSponsors(CURRENT_EVENT_ID);
        const rawData = rawSponsorResponse;

        console.log("Raw Sponsor Data: ", rawData);
        
        sponsors.value = rawData.map(s => {
          const tierId = s.sponsorTierId;
          const tierName = tierMap[tierId];

          console.log(`Sponsor ID: ${s.name}, Tier ID: ${tierId}, Mapped Name: ${tierName}`);
          
          return {
            name: s.name,
            website: s.website,
            logoUrl: s.image || null,
            tier: tierName
          };
        });
        // console.log("Sponsor data loaded:", sponsors.value); 
      }catch(err){
        console.error("Failed to fetch sponsors: ", err);
        sponsors.value = [];
      }
    };

    onMounted(()=> {
      fetchSponsors();
    });
    return {
      sponsors, 
      eventYear,
      getSponsorStyle
    };
  }
};
</script>

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
  width: 300px;
  height: 120px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 0;
  border: 6px solid #fff;
  text-align: center;
  color: white;
  line-height: 120px;
  font-size: 20px;
  transition: all 0.3s ease;
}

.about {
    position: relative;
    top: -650px;
    margin-bottom: -550px;
    text-align: center;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    background-color:#ccffcc;
}
.about .row {
    text-align: center;
}
.about .text {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
}

.about .header .circle {
    font-size: 50px;
    color: #93dda3;
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
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
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
    text-align: center;
}
.schedule .header .circle {
    font-size: 40px;
}
.faq{
  background-color: #ccffcc;
  text-align: center;
}
.prizes{
  background-color: #ccffcc;
  text-align: center;
}
.prize-titles{
  background-color:#ccffcc;
}
.sponsors{
  background-color:#ccffcc;
  text-align: center;
}
.question{
  background-color: #ccffcc;
  width: 100%;
  max-width: 100%;
  padding-left: 25px;
  padding-right: 25px;
}
.circle p {
    color:#64965d;
    font-size: 32px;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    transform: skew(20deg);
    white-space: nowrap;
}
#day-tag {
    font-size: 50px;
}
.sponsors .sponsor-images {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.sponsors .sponsor-images img {
    max-width: 200px;
    padding: 20px;
}
.sponsor-card {
  text-align: center;
  margin: 1rem;
  display: inline-block;
}
.sponsor-logo {
  max-width: auto;
  max-height: auto;
  object-fit: contain;
  margin-bottom: 0.5rem;
}
.container {
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 38px 20px;
    box-sizing: border-box;
}
.register-button {
  display: inline-block;
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 20px;
  z-index: 10; /* Ensure it's above the video */
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.register-button:hover {
  background-color: white;
  transform: scale(1.05); /* Slight zoom effect */
}

.register-button:active {
  transform: scale(0.95); /* Slightly pressed-in effect */
}

.sponsor-images{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  min-height: 200px;
}

.sponsor-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: transform 0.2s;
}

.sponsor-logo {
  max-width: 200px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.sponsor-name{
  font-size: 24px;
  font-weight: 700;
  color: #333;
  padding: 10px;
}

</style>