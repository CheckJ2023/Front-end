<template>
  <div class="backgroundFaq">

    <!-- faq -->
  <div class="faq-super-container">
    <div class="faq-container">
      <h2>Frequently Asked Questions</h2>
      <details open>
        <summary>How do you create an accordion?</summary>
        <div>
          Easy! As long as you don't have to support IE11 or older browsers you
          could use <code>&lt;details&gt;</code> and
          <code>&lt;summary&gt;</code> natively.
        </div>
      </details>
      <details>
        <summary>What if I have to support IE11 or older browsers?</summary>
        <div>
          No worries. The fallback for these elements is quite good. They will
          display as open. You won't get the open/close mechanism, but you won't
          lose any content either.
        </div>
      </details>
      <details>
        <summary>What type of content can I have inside one of these?</summary>
        <div>
         加入會員
          <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content"
            target="_blank">flow content</a>, which is basically everything.
        </div>
      </details>

    </div>

    <!-- contact -->
    <div class="contact-container">
     <h2>Contect for Us</h2>      
     <input name="name" type="text" class="feedback-input" placeholder="Name" />   
     <input name="email" type="text" class="feedback-input" placeholder="Email" />
     <textarea name="text" class="feedback-input" placeholder="Comment"></textarea>
     <input type="submit" value="SUBMIT"/>
    </div>

  </div>
  </div>
</template>

<script>
</script>

<style scoped>
/****************************** Faq style *************************************/

.backgroundFaq {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("src/assets/faq.jpg");
  background-color: blue;
  border-color:green;
  margin: auto;
  display: Flex;
  justify-content: center;
}

.faq-super-container{
  position:fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
}

h1, h2 {
  right:0;
  left:0;
  margin-left: auto;
  margin-right: auto;
  font-size: 38px;
  font-weight: 300;
  text-align: center;
  letter-spacing: 5px;
  color: #000;
  position: static;
}


.faq-container{
  
  top:10%;
  width: 60%;
  max-width: 700px;
  right:0;
  left:0;
  margin-left: auto;
  margin-right: auto;
  position: static;
  /* background-color:red; */
}

details div {

  margin-left: auto;
  margin-right: auto;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  padding: 1.5em;
  background-color: white;
  opacity: 0.5;
  
  
}

details div > * + * {
  
  margin-top: 1.5em;
}

details + details {
  margin-top: 0.5rem;
  
}

summary {
  
  border: 2px solid #000;
  padding: 0.75em 1em;
  cursor: pointer;
  position: relative;
  padding-left: calc(1.75rem + 0.75rem + 0.75rem);
  background-color: white;
  opacity: 0.8;
}

summary:before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  content: "↓";
  width: 1.75rem;
  height: 1.75rem;
  background-color: #000;
  color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

details[open] summary {
  background-color: #eee;
}

details[open] summary:before {
  content: "↑";
}

summary:hover {
  background-color: #eee;
}


.contact-container{
  margin-top: 10%;
  width: 50%;
  max-width: 600px;
  /* background-color: yellow; */
  right:0;
  left:0;
  margin-left: auto;
  margin-right: auto;
  position: static;
  /* background-color: red; */
  margin-bottom: 5%;
}

/* body { background:rgb(30,30,40); } */
/* form { max-width:420px; margin:50px auto; } */

.feedback-input {
  color:#000;
  font-weight:500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border:2px solid #000;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width:100%;
  box-sizing: border-box;
  outline:0;
  background-color: white;
  opacity: 0.7;
}

.feedback-input:focus { border:2px solid #2c2626; }

textarea {
  height: 150px;
  line-height: 150%;
  resize:vertical;
}

[type="submit"] {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  width: 100%;
  background:#403c3c;
  border-radius:5px;
  border:0;
  cursor:pointer;
  color:white;
  font-size:24px;
  padding-top:10px;
  padding-bottom:10px;
  transition: all 0.3s;
  margin-top:-4px;
  font-weight:700;
}
[type="submit"]:hover { background:#727070; }
</style>