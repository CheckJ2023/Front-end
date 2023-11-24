<template>
  <div class="backgroundFaq">
    <h2>Frequently Asked Questions</h2>
    <div>
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
    <div>
    <h2>Contect for Us</h2>      
  <input name="name" type="text" class="feedback-input" placeholder="Name" />   
  <input name="email" type="text" class="feedback-input" placeholder="Email" />
  <textarea name="text" class="feedback-input" placeholder="Comment"></textarea>
  <input type="submit" value="SUBMIT"/>
    </div>
  </div>
</template>
