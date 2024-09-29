export type ApiTicketack_Film = {
    "_id": string,
    "title": {
        "fr": string,
        "original": string
    },
    "description": {},
    "start_at": string,             //"2024-08-28T15:20:00.000Z"
    "stop_at": string,              //"2024-08-28T16:50:00.000Z"
    "ignore_overlap_rules": false,
    "buckets":         {
        "_id": string,
        "total_capacity": number,
        "may_steal_from": [],
        "rules": {
            "not_after": string,
            "only_for_roles": ("on-site"|"admin"|"eshop")[]
        },
        "available": number,
        "confirmed": number,
        "unconfirmed": number,
        "scanned": number,
        "_in": number,
    }[],
    "pricings": {
        "fullprice": {
            "name": {
                "fr": string
            },
            "description": {},
            "price": {
                "CHF": number
            },
            "value": {
                "CHF": number
            },
            "wallet_amount": {
                "CHF": number
            },
            "value_per_screening": {
                "CHF": number
            },
            "VAT": number,
            "category": string,
            "sellers": ("on-site"|"admin"|"eshop")[],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": number
            },
            "rules": {}
        },
        "reduced": {
            "name": {
                "fr": string
            },
            "description": {
                "fr": string
            },
            "price": {
                "CHF": number
            },
            "value": {
                "CHF": number
            },
            "wallet_amount": {
                "CHF": number
            },
            "value_per_screening": {
                "CHF": number
            },
            "VAT": number,
            "category": string,
            "sellers": ("on-site"|"admin"|"eshop")[],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": 2
            },
            "rules": {}
        },
        "support": {
            "name": {
                "fr": string
            },
            "description": {
                "fr": string
            },
            "price": {
                "CHF": number
            },
            "value": {
                "CHF": number
            },
            "wallet_amount": {
                "CHF": number
            },
            "value_per_screening": {
                "CHF": number
            },
            "VAT": number,
            "category": string,
            "sellers": ("on-site"|"admin"|"eshop")[],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": number
            },
            "rules": {}
        },
        "free": {
            "name": {
                "fr": "Offert"
            },
            "description": {},
            "price": {
                "CHF": 0
            },
            "value": {
                "CHF": 0
            },
            "wallet_amount": {
                "CHF": 0
            },
            "value_per_screening": {
                "CHF": 0
            },
            "VAT": 0,
            "category": "default",
            "sellers": [
                "on-site",
                "admin"
            ],
            "refs": [],
            "opaque": {
                "eshop_sort_weight": 4
            },
            "rules": {}
        }
    },
    "cinema_hall": {
        "_id": "f763cf40-c027-45d8-8a3e-96cd7263d2ac",
        "created_at": "2024-08-27T14:40:26.000Z",
        "updated_at": "2024-08-27T14:40:26.000Z",
        "number": "1",
        "name": "Salle",
        "cinema": "Le Cinématographe de Lausanne",
        "address": "Casino de Montbenon, Allée Ernest-Ansermet 3",
        "zip": "1003",
        "city": "Lausanne",
        "state": "VD",
        "country": "Suisse",
        "refs": [],
        "opaque": {
            "capacity": "100"
        }
    },
    "films": [
        {
            "_id": "dcf6c186-92d1-4f43-8210-03fed73758cf",
            "title": {
                "fr": "30 JOURS MAX",
                "original": "30 JOURS MAX"
            },
            "sections": [],
            "opaque": {
                "type": "movie",
                "service_type": null,
                "description": {
                    "fr": "<p>Rayane est un jeune flic trouillard et maladroit sans cesse moqué par les autres policiers. Le jour où son médecin lui apprend à tort qu’il n’a plus que trente jours à vivre, il comprend que c’est sa dernière chance pour devenir un héros au sein de son commissariat et impressionner sa collègue Stéphanie. L’éternel craintif se transforme alors en véritable tête brûlée qui prendra tous les risques pour coincer un gros caïd de la drogue…</p>"
                },
                "suisa": "1014.462",
                "year": 2020,
                "distributor": {
                    "id": "ef56f5fb-ec7b-435b-8cf5-bead63ade74a",
                    "created_at": "2018-09-20T18:25:54+02:00",
                    "updated_at": "2023-02-28T09:03:07+01:00",
                    "name": "Frenetic Films ag",
                    "address": "Riedtlistrasse 23",
                    "zip": "80004",
                    "city": "Zurich",
                    "country": "CH",
                    "maccsbox_id": "CH1122",
                    "contact_mail": "",
                    "report_mail": ""
                },
                "l_min_age": "",
                "s_min_age": "",
                "a_min_age": "",
                "free_text_1": {
                    "fr": ""
                },
                "free_text_2": {
                    "fr": ""
                },
                "free_text_3": {
                    "fr": ""
                },
                "posters": [
                    {
                        "url": "https://api-kronos.ticketack.com/posters/70e0d626-93ed-4d03-8969-58cf775f5372.jpg"
                    },
                    {
                        "url": "https://api-kronos.ticketack.com/posters/1185b2c5-1286-46d8-8f55-e9705d7457b6.jpg"
                    }
                ],
                "trailers": [
                    {
                        "url": "https://www.youtube.com/embed/R8cOK5mE5P8",
                        "image": "https://img.youtube.com/vi/R8cOK5mE5P8/maxresdefault.jpg"
                    }
                ],
                "genre": "Comédie",
                "sections": [],
                "people": [
                    {
                        "activity": "director",
                        "firstname": "Tarek",
                        "lastname": "Boudali"
                    },
                    {
                        "activity": "actor",
                        "firstname": "Philippe",
                        "lastname": "Lacheau"
                    },
                    {
                        "activity": "actor",
                        "firstname": "José",
                        "lastname": "Garcia"
                    }
                ],
                "duration": 90,
                "countries": [
                    "FR"
                ],
                "languages": {
                    "original": [
                        "fr"
                    ],
                    "audio": [
                        "fr"
                    ],
                    "subtitles": []
                }
            }
        }
    ],
    "sections": [],
    "refs": [
        {
            "id": "b442a586-81ea-48f7-a494-1d5c6206bf11"
        }
    ],
    "opaque": {
        "posters": [
            {
                "url": "https://api-kronos.ticketack.com/posters/70e0d626-93ed-4d03-8969-58cf775f5372.jpg"
            }
        ],
        "week": 1,
        "break": false,
        "format": "",
        "version": "",
        "_3d": false,
        "ignore_on_maccsbox": true
    }
}
