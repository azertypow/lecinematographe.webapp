<template>
  <div id="newsletter"
       class="v-app-newsletter"
  >

    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form action="https://lecinematographe.us22.list-manage.com/subscribe/post?u=a49aea9e2cab458eaa9738b98&amp;id=7fe65e2807&amp;f_id=002bd9e1f0"
              method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
              target="_self" novalidate="">
          <div id="mc_embed_signup_scroll" class="inf-main">
            <h4>Newsletter</h4>

            <div class="inf-content">
              <input type="email" name="EMAIL"
                     class="required email"
                     id="mce-EMAIL"
                     required=""
                     value=""
                     placeholder="votre email"
              >
              <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_a49aea9e2cab458eaa9738b98_7fe65e2807" tabindex="-1" value=""></div>
              <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button"
                     style="cursor: pointer;"
                     value="Envoyer">
            </div>
          </div>
        </form>
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped >
.v-app-newsletter {
  background: var(--lc-color--pink);
  margin-top: 4rem;
  margin-bottom: 2rem;
  padding: .25rem;
  border-radius: var(--lc-radius);
}

.inf-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: .25rem .25rem;
  box-sizing: border-box;

  h4 {
    margin: 0;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
  }
}

.inf-content {
  display: flex;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    width: 100%;
    flex-direction: column;
  }

  input {
    font-family: "DIN Dong", Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    border: none;
    display: block;
    font-size: inherit;
    line-height: inherit;
    height: 1rem;
    max-width: 100%;

    &::placeholder {
      opacity: .5; /* Assure une opacité maximale pour le texte */
    }

    @media (max-width: 1100px) {
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
  }

  [type="email"] {
    background: transparent;
    border-bottom: solid 2px white;
    color: white;

    &::placeholder {
      color: white;
    }

    &:focus-visible {
      outline: none;
    }

    @media (max-width: 1100px) {
      margin-top: 1rem;
    }
  }

  input[type="submit"] {
    font-size: .5rem;
    margin-left: .5rem;
  }
}
</style>
