import type {IFilmListResponse, ITicketFilm} from "~/_utils/apiTicket";

export default defineEventHandler((event) => {
    return {
        "filmlist": [
            {
                "id_film": 9039,
                "id_ctr": 0,
                "tx_titre_lng": "CORBEAUX & CORNEILLES",
                "tx_titre_ori": "CROWS",
                "tx_comment": "<p>Les corbeaux et les corneilles nous accompagnent et nous observent depuis le d&eacute;but de l&#145;histoire de l&#145;humanit&eacute;. Ils ont vu nos premiers pas dans la marche debout et entendu nos premiers sons articul&eacute;s. Ils c&eacute;l&egrave;brent des mariages avec nous, se nourrissent des restes de pique-niques romantiques et de f&ecirc;tes sauvages, et font des ravages dans les d&eacute;charges des m&eacute;gapoles.</p>",
                "tx_duree": " 1h30",
                "tx_age": "Age légal 10 ans / suggéré dès 12 ans / accompagné dès 8 ans",
                "ur_age": "http://www.filmages.ch/",
                "tx_pays": "Suisse",
                "tx_annee": "2024",
                "tx_realisateur": "De Martin SCHILT.",
                "tx_acteur": "Voix de Marthe KELLER.",
                "tx_distributeur": "MOVIEBIZ FILMS GMBH",
                "ur_distributeur": "",
                "nb_note": 4,
                "ur_vignette": "https://cinemotion.ch/image/FV0009039.jpg",
                "ur_affiche": "https://cinemotion.ch/image/FA0009039.jpg"
            }
        ]
    } as IFilmListResponse
})
