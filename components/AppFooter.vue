<template>
    <footer class="v-app-footer" >
        <div
            class="v-app-footer__newsletter-container"
        >
            <form
                    method="post"
                    action="https://newsletter.infomaniak.com/external/submit"
                    class="v-app-footer__newsletter-container__form"
                    target="_blank"
            >
                <input
                        type="email"
                        name="email"
                        style="display:none"
                />
                <input type="hidden"
                       name="key"
                       value="eyJpdiI6ImxEQmYwMU52ZkM0OGl4TlBVQWs4YmJtb1wvZ2Q0MkpIcGlZY3RPblZGeUxZPSIsInZhbHVlIjoiVEpHXC93ZVwvcCtPMTFnMGNTclpuU1RRMzNLZ1pKdUV2dVF4bjVnV05HUW1JPSIsIm1hYyI6IjE4NjNiNjNhYzY2MTE4YmFlNmQ0NmQ2ZDg3MWE1ZmY0YTEyYzFhZDU4NTQzZjNiMzdjY2I5ZGUzMTVkYTk3MWMifQ=="
                >
                <input
                        type="hidden"
                        name="webform_id"
                        value="15422"
                >

                <div class="inf-main_76f376382a50bd4859e50a81e701da10">
                    <h4>Newsletter</h4>
                    <div class="inf-success" style="display:none"><h4>C'est tout bon, merci !</h4>
                        <p><a href="#" class="inf-btn">&laquo;</a></p>
                    </div>
                    <div class="inf-content">
                        <input
                            type="email"
                            name="inf[1]"
                            data-inf-meta="1"
                            data-inf-error="Merci de renseigner une adresse email"
                            required
                            placeholder="Votre Email"
                        >
                        <input type="submit"
                               name=""
                               value="Envoyer"
                        >
                    </div>
                </div>
            </form>
        </div>

        <div
            class="v-app-footer__content"
        >
            <div
                class="v-app-footer__content__left"
            >
                <img
                    class="v-app-footer__content__img"
                    alt="photo du cinéma"
                    src="../assets/cinematographe_web.jpeg"  />

                <div
                    class="v-app-footer__content__text"
                >
                    <p>
                        LE CINÉMATOGRAPHE
                        <br>Casino de Montbenon
                        <br>All. Ernest-Ansermet 3
                        <br>1003 Lausanne
                    </p>
                    <p>
                        <a href="mailto:contact@lecinematographe.ch"
                           target="_blank"
                        >contact@lecinematographe.ch</a>
                    </p>

                </div>
            </div>

            <div
                class="v-app-footer__content__right"
            >
                <p>
                    Développement : Nicolas Baldran
                    <br>Typographie : <a href="https://typotheque.genderfluid.space/DINdong.html" >Dindong</a> par Clara Sambot
                    <br>Graphisme : Clovis Duran
                </p>
                <p>
                  <nuxt-link href="/condition-generales">condition général</nuxt-link> et <nuxt-link href="/politique-de-confidentialite" >Politique de confidentialité</nuxt-link>
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
}

.v-app-footer__newsletter-container {
    background: var(--lc-color--pink);
    margin-top: 4rem;
    margin-bottom: 2rem;
}

.inf-main_76f376382a50bd4859e50a81e701da10 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: .5rem .5rem;
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

    > input {
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

    > input[type="submit"] {
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

.v-app-footer__content__img {
    display: block;
    width: calc(100% / 4 * 1);
    object-fit: contain;
    object-position: top;

    @media (max-width: 1100px) {
        width: 50%;
    }

    @media (max-width: 750px) {
        width: 100%;
        max-width: 10rem;
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
