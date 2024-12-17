<template>
    <footer class="v-app-footer" >
        <div id="newsletter"
            class="v-app-footer__newsletter-container"
        >

          <div id="mc_embed_shell">
            <div id="mc_embed_signup">
              <form action="https://lecinematographe.us22.list-manage.com/subscribe/post?u=a49aea9e2cab458eaa9738b98&amp;id=7fe65e2807&amp;f_id=002bd9e1f0"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
                    target="_self" novalidate="">
                <div id="mc_embed_signup_scroll" class="inf-main">
                  <h4>Newsletter</h4>

                  <div class="inf-content">
                    <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="">
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

        <div
            class="v-app-footer__content"
        >
            <div
                class="v-app-footer__content__left"
            >
                <div
                    class="v-app-footer__content__text"
                >
                    <p>
                        Collectif du nouveau Cinématographe
                        <br>Casino de Montbenon
                        <br>All. Ernest-Ansermet 3
                        <br>1003 Lausanne
                    </p>

                </div>
            </div>

            <div
                class="v-app-footer__content__right"
            >
                <p>
                    <nuxt-link href="/conditions-generales">Conditions générales</nuxt-link>
                    <br><nuxt-link href="/politiques-de-confidentialite" >Politique de confidentialité</nuxt-link>
                </p>
                <p>
                    <a href="mailto:contact@lecinematographe.ch"
                       target="_blank"
                    >contact@lecinematographe.ch</a>
                </p>
            </div>

        </div>
    </footer>
</template>





<script lang="ts" setup>
// defineProps<{
// }>()

</script>





<style lang="scss" scoped >
.v-app-footer {
    width: min(var(--lc-max-width--reg), 100%);
}

.v-app-footer__newsletter-container {
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

.v-app-footer__content {
    display: flex;

    @media (max-width: 1100px) {
        flex-direction: column;
    }
}

.v-app-footer__content__left {
    display: flex;
    width: 50%;

    @media (max-width: 1100px) {
        width: 100%;
    }

    @media (max-width: 750px) {
        flex-direction: column;
    }
}

.v-app-footer__content__text {
    box-sizing: border-box;
    width: calc(100% / 4 * 3);
    padding-left: .5rem;

    @media (max-width: 1100px) {
        width: 50%;
    }

    @media (max-width: 750px) {
        width: 100%;
        margin-top: .5rem;
        padding-left: 0;
    }

    > p {
        margin-top: .5rem;
        margin-bottom: .5rem;
        font-size: .5rem;
        line-height: .65rem;

        &:first-child {
            margin-top: 0;
        }
    }
}

.v-app-footer__content__right {
    width: 50%;

    @media (max-width: 1100px) {
        margin-top: 1rem;
        width: 100%;
    }

    > p {
        margin-top: .5rem;
        margin-bottom: .5rem;
        font-size: .5rem;
        line-height: .65rem;

        &:first-child {
            margin-top: 0;
        }
    }
}
</style>
